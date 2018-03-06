<?php

namespace App\Jobs\Music;

use App\Models\SongFile;
use App\Services\Music\SongModelManager\contracts\SongModelManagerInterface;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class AssociateSongFileWithSongModel implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    
    /**
     * @var SongFile
     */
    protected $songFile;
    
    /**
     * AssociateSongFileWithSongModel constructor.
     *
     * @param SongFile $songFile
     */
    public function __construct(SongFile $songFile)
    {
        $this->songFile = $songFile;
    }
    
    /**
     * main method of the Job
     *
     * @param SongModelManagerInterface $songModelManager
     */
    public function handle(SongModelManagerInterface $songModelManager)
    {
        $this->songFile->changeStatus(SongFile::PROCESS_STATUS_FETCH_SONG_DATA);
        
        $shortMeta = $this->getTitleAndArtistFromMeta();
        
        if (!$shortMeta) {
            return;
        }
    
        $song = $songModelManager->firstOrCreate($shortMeta);
    
        if (!$song) {
            return;
        }
    
        $this->songFile->song()->associate($song);
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
}
