<?php

namespace App\Services\Music\SongDataFetcher\Responses;

use App\Services\Music\SongDataFetcher\Exceptions\SongDataFetcherException;

class SongResponse
{
    /**
     * Song title
     *
     * @var string
     */
    public $title;
    
    /**
     * Artist Name
     *
     * @var string
     */
    public $artist;
    
    /**
     * Album Name
     *
     * @var string
     */
    public $album;
    
    /**
     * path to album image
     *
     * @var string
     */
    public $albumImage;
    
    /**
     * check if the response has base data
     *
     * @return bool
     */
    public function isEmpty()
    {
        return !$this->title || !$this->artist;
    }
    
    /**
     * create SongResponse from data that given
     *
     * @param array $data
     * @return SongResponse
     * @throws SongDataFetcherException
     */
    public static function create(array $data = [])
    {
        $songResponseInstance = new self;
        
        foreach ($data as $prop => $value) {
            
            if (!property_exists($songResponseInstance, $prop)) {
                throw new SongDataFetcherException('SongResponse cannot do not have property with the name "' . $prop . '"');
            }
            
            $songResponseInstance->{$prop} = $value;
        }
        
        return $songResponseInstance;
    }
}