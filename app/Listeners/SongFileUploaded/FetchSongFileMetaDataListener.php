<?php

namespace App\Listeners\SongFileUploaded;

use getID3;
use App\Events\SongFileUploadedEvent;
use App\Models\SongFile;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Storage;

class FetchSongFileMetaDataListener implements ShouldQueue
{
    use InteractsWithQueue;
    
    /**
     * @var getID3
     */
    protected $id3Reader;
    
    /**
     * meta data structure
     *
     * @var array
     */
    protected $metaDataStructure = [
        'error' => null,
        'data' => [
            'title' => null,
            'artist' => null,
            'album' => null,
            'genre' => null,
            'track_number' => null,
        ],
    ];
    
    /**
     * FetchSongFileMetaDataListener constructor.
     *
     * @param \getID3 $id3Reader
     */
    public function __construct(getID3 $id3Reader)
    {
        $this->id3Reader = $id3Reader;
    }
    
    /**
     * Handle the event.
     *
     * @param  SongFileUploadedEvent  $event
     * @return void
     */
    public function handle(SongFileUploadedEvent $event)
    {
        $songFile = $event->songFile;
        
        $songFile->changeStatus(SongFile::PROCESS_STATUS_FETCH_META);
        
        $tags = $this->fetchMetaFromFile($songFile);
        $this->setDataFromTagsArray($tags);
        
        $songFile->meta = $this->metaDataStructure;
        $songFile->save();
    }
    
    /**
     * Fetch all the tags from the file
     *
     * @param SongFile $songFile
     * @return array
     */
    protected function fetchMetaFromFile(SongFile $songFile)
    {
        $fullMeta = $this->id3Reader->analyze(
            Storage::disk('songs')->path($songFile->path)
        );
        
        if (!isset($fullMeta['tags']) || !is_array($fullMeta['tags'])) {
            
            $this->metaDataStructure['error'] = 'Tags not found or Tag is not an array in file meta.';
            return [];
        }
        
        return $fullMeta['tags'];
    }
    
    /**
     * set requested meta data from the tags to an array
     *
     * @param array $tags
     */
    protected function setDataFromTagsArray(array $tags)
    {
        foreach ($tags as $tagsGroup) {
            foreach ($this->metaDataStructure['data'] as $metaName => $value) {
                
                if (!$newValue = array_get($tagsGroup, $metaName, false)) {
                    continue;
                }
    
                $this->metaDataStructure['data'][$metaName] = is_array($newValue) ? $newValue[0] : $newValue;
            }
        }
    }
}
