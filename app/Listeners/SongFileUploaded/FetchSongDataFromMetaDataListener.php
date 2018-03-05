<?php

namespace App\Listeners\SongFileUploaded;

use App\Events\SongFileUploadedEvent;
use App\Models\SongFile;
use App\Services\SongModelManager\contracts\SongModelManagerInterface;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Storage;

class FetchSongDataFromMetaDataListener implements ShouldQueue
{
    /**
     * @var SongModelManagerInterface
     */
    protected $songModelManager;
    
    /**
     * @var SongFile
     */
    protected $songFile;
    
    /**
     * FetchSongDataFromMetaDataListener constructor.
     *
     * @param SongModelManagerInterface $songModelManager
     */
    public function __construct(SongModelManagerInterface $songModelManager)
    {
        $this->songModelManager = $songModelManager;
    }
    
    /**
     * main method of the listener
     *
     * @param SongFileUploadedEvent $event
     */
    public function handle(SongFileUploadedEvent $event)
    {
        $this->songFile = $event->songFile;
        $this->songFile->changeStatus(SongFile::PROCESS_STATUS_FETCH_SONG_DATA);
        
        $shortMeta = $this->getTitleAndArtistFromMeta();
        
        if ($shortMeta) {
            $song = $this->songModelManager->firstOrCreate($shortMeta);
            
            if ($song) {
                $this->songFile->song()->associate($song);
            }
        }
        
        $newPath = $this->moveTheFileToPermanentPath();
    
        $this->songFile->fill([
            'process_status' => SongFile::PROCESS_STATUS_DONE,
            'path' => $newPath,
        ]);
        
        $this->songFile->save();
    }
    
    /**
     * get the title and the artist from the SongFile
     *
     * @return array|bool
     */
    protected function getTitleAndArtistFromMeta()
    {
        if (!$this->songFile->meta) {
            return false;
        }
        
        $data = $this->songFile->meta['data'];
        
        if (!$data['title'] || !$data['artist']) {
            return false;
        }
        
        return array_filter($data, function ($key) {
            
            return \in_array($key, ['title', 'artist'], true);
            
        }, ARRAY_FILTER_USE_KEY);
    }
    
    /**
     * move the file to permanent path and return the path
     *
     * @return string
     */
    protected function moveTheFileToPermanentPath()
    {
        $permanentPath = SongFile::generatePath($this->songFile->user, $this->songFile->file_name);
        
        Storage::disk('songs')->move(
            $this->songFile->path,
            $permanentPath
        );
        
        return $permanentPath;
    }
}