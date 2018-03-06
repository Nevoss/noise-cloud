<?php

namespace App\Events\Music;

use App\Models\SongFile;
use Illuminate\Queue\SerializesModels;
use Illuminate\Foundation\Events\Dispatchable;

class SongFileUploadedEvent
{
    use Dispatchable, SerializesModels;
    
    /**
     * @var SongFile
     */
    public $songFile;
    
    /**
     * SongFileUploaded constructor.
     *
     * @param SongFile $songFile
     */
    public function __construct(SongFile $songFile)
    {
        $this->songFile = $songFile;
    }
}
