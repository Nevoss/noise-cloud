<?php

namespace App\Services\Music\SongModelManager;

use App\Models\Song;
use App\Services\Music\SongModelManager\contracts\SongModelManagerInterface;

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