<?php

namespace App\Services\SongModelManager;

use App\Models\Artist;
use App\Models\Song;
use App\Services\SongModelManager\contracts\SongModelManagerInterface;

class SongModelManagerFake implements SongModelManagerInterface
{
    /**
     * fake method for testing
     *
     * @param array $options
     * @return mixed|null
     */
    public function firstOrCreate(array $options)
    {
        if ($options['title'] === '') {
            return null;
        }
        
        return create(Song::class);
    }
}