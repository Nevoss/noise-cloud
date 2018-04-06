<?php

namespace App\Services\Music\SongDataFetcher;

use App\Services\Music\SongDataFetcher\Exceptions\SongDataFetcherException;

class SongDataFetcherFactory
{
    /**
     * array of song data fetcher options
     *
     * @var array
     */
    protected static $dataFetchers = [
        'spotify' => SpotifySongDataFetcher::class,
        'last-fm' => LastFmSongDataFetcher::class,
    ];
    
    /**
     * @param $serviceKey
     * @return mixed
     * @throws SongDataFetcherException
     */
    public static function make($serviceKey)
    {
        
        if (!array_key_exists($serviceKey, self::$dataFetchers)) {
            throw new SongDataFetcherException("The provider {$serviceKey} Not found.");
        }
        
        return app()->make(self::$dataFetchers[$serviceKey]);
    }
}