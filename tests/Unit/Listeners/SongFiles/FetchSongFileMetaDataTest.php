<?php
namespace Tests;

use App\Events\SongFileUploadedEvent;
use App\Listeners\SongFileUploaded\FetchSongFileMetaDataListener;
use App\Models\SongFile;
use App\Models\User;

class FetchSongFileMetaDataTest extends TestCase
{
    /** @test */
    public function it_fetch_meta_data_from_the_file()
    {
        $user = create(User::class);
        
        $songFile = $this->createFakeSongFile($user);
        
        app()->make(FetchSongFileMetaDataListener::class)->handle(
            new SongFileUploadedEvent($songFile)
        );
        
        $this->assertDatabaseHas('song_files', [
            'id' => $songFile->id,
            'process_status' => SongFile::PROCESS_STATUS_FETCH_META
        ]);
        
        $meta = $songFile->fresh()->meta;
        
        $this->assertArraySubset([
            'error' => null,
            'data' => []
        ], $meta);
        
        $this->assertArraySubset([
            'title' => 'One of Us',
            'artist' => 'Eatliz',
        ], $meta['data']);
    }
}