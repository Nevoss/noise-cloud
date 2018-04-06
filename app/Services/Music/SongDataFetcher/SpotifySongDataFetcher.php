<?php

namespace App\Services\Music\SongDataFetcher;

use App\Services\Music\SongDataFetcher\Contracts\SongDataFetcherInterface;

class SpotifySongDataFetcher implements SongDataFetcherInterface
{
    public function getSongInfo($title, $artist)
    {
        throw new \Exception('SpotifySongDataFetcher is not fully build yet');
    }
}