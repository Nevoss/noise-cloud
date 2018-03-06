<?php

namespace App\Listeners\Music\SongFileUploaded;

use App\Events\Music\SongFileUploadedEvent;
use App\Jobs\Music\AssociateSongFileWithSongModel;
use App\Jobs\Music\MoveFileToPermanentPath;
use App\Jobs\Music\ReadId3FromFile;

class FindSongMetaDataListener
{
    /**
     * Handle the event.
     * First it fetch the meta tags from the file
     * Sec it check if Song model exist and create on from api if not
     * Third it move the file to the permanent path
     *
     * @param  SongFileUploadedEvent  $event
     * @return void
     */
    public function handle(SongFileUploadedEvent $event)
    {
        ReadId3FromFile::withChain([
            new AssociateSongFileWithSongModel($event->songFile),
            new MoveFileToPermanentPath($event->songFile),
        ])->dispatch($event->songFile);
    }
}
