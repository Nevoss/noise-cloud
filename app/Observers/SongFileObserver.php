<?php

namespace App\Observers;

use App\Models\SongFile;
use Illuminate\Support\Facades\Storage;

class SongFileObserver
{
    /**
     * On Deleting SongFile
     *
     * @param SongFile $songFile
     */
    public function deleting(SongFile $songFile)
    {
        Storage::disk('songs')->delete($songFile->path);
    }
}