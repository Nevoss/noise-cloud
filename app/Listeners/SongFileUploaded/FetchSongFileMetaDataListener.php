<?php

namespace App\Listeners\SongFileUploaded;

use App\Events\SongFileUploadedEvent;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class FetchSongFileMetaDataListener implements ShouldQueue
{
    use InteractsWithQueue;
    
    /**
     * FetchSongFileMetaData constructor.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  SongFileUploadedEvent  $event
     * @return void
     */
    public function handle(SongFileUploadedEvent $event)
    {
        //
    }
}
