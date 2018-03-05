<?php

namespace App\Services\SongDataFetcher\Contracts;

use App\Services\SongDataFetcher\Responses\SongResponse;

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