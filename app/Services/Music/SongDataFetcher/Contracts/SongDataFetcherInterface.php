<?php

namespace App\Services\Music\SongDataFetcher\Contracts;

use App\Services\Music\SongDataFetcher\Responses\SongResponse;

interface SongDataFetcherInterface
{
    /**
     * Search from a song base on song title,
     * and artist name.
     *
     * @param $title
     * @param $artist
     * @return SongResponse
     */
    public function getSongInfo($title, $artist);
}