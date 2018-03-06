<?php

namespace App\Jobs\Music;

use App\Models\SongFile;
use getID3;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Storage;

class ReadId3FromFile implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    
    /**
     * @var getID3
     */
    protected $id3Reader;
    
    /**
     * @var SongFile
     */
    protected $songFile;
    
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
     * ReadId3FromFile constructor.
     *
     * @param SongFile $songFile
     */
    public function __construct(SongFile $songFile)
    {
        $this->songFile = $songFile;
    }
    
    /**
     * handle the Job
     *
     * @param getID3 $id3Reader
     */
    public function handle(getID3 $id3Reader)
    {
        $this->id3Reader = $id3Reader;
    
        $this->songFile->changeStatus(SongFile::PROCESS_STATUS_FETCH_META);
        
        $tags = $this->fetchMetaFromFile();
        $this->setDataFromTagsArray($tags);
    
        $this->songFile->meta = $this->metaDataStructure;
        $this->songFile->save();
    }
    
    /**
     * Fetch all the tags from the file
     *
     * @return array
     */
    protected function fetchMetaFromFile()
    {
        $fullMeta = $this->id3Reader->analyze(
            Storage::disk('songs')->path($this->songFile->path)
        );
        
        if (!isset($fullMeta['tags']) || !\is_array($fullMeta['tags'])) {
            
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
                
                $this->metaDataStructure['data'][$metaName] = \is_array($newValue) ? $newValue[0] : $newValue;
            }
        }
    }
}