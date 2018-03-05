<?php

namespace App\Services\SongModelManager\contracts;

use App\Models\Song;

interface SongModelManagerInterface
{
    /**
     * @param array $options
     * @return Song|null
     */
    public function firstOrCreate(array $options);
}