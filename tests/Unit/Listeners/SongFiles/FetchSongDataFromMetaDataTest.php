<?php

namespace Tests;

use App\Events\SongFileUploadedEvent;
use App\Listeners\SongFileUploaded\FetchSongDataFromMetaDataListener;
use App\Models\Song;
use App\Models\SongFile;
use App\Models\User;
use App\Services\SongModelManager\contracts\SongModelManagerInterface;
use App\Services\SongModelManager\SongModelManagerFake;
use Illuminate\Support\Facades\Storage;

class FetchSongDataFromMetaDataTest extends TestCase
{
    public function setUp()
    {
        parent::setUp();
    
        app()->bind(SongModelManagerInterface::class, SongModelManagerFake::class);
    }
    
    /** @test */
    public function it_move_the_file_to_permanent_path()
    {
        $user = create(User::class);
    
        $songFile = $this->createFakeSongFile($user);
        
        app()->make(FetchSongDataFromMetaDataListener::class)->handle(
            new SongFileUploadedEvent($songFile)
        );
        
        Storage::disk('songs')->assertExists(SongFile::generatePath($songFile->user, $songFile->file_name));
        $this->assertEquals($songFile->fresh()->process_status, SongFile::PROCESS_STATUS_DONE);
    }   
    
    /** @test */
    public function it_attached_a_song_to_file()
    {
        $user = create(User::class);
    
        $songFile = $this->createFakeSongFile($user, [
            'meta' => [
                'error' => null,
                'data' => [
                    'title' => 'One Of Us',
                    'artist' => 'Eatliz',
                ]
            ]
        ]);
    
        app()->make(FetchSongDataFromMetaDataListener::class)->handle(
            new SongFileUploadedEvent($songFile)
        );
        
        $song = $songFile->fresh()->song;
        
        $this->assertNotNull($song);
        $this->assertInstanceOf(Song::class, $song);
    }
    
    /** @test */
    public function it_not_attached_a_song_to_file_if_song_not_founded()
    {
        $user = create(User::class);
    
        $songFile = $this->createFakeSongFile($user, [
            'meta' => [
                'error' => null,
                'data' => [
                    'title' => '',
                    'artist' => '',
                ]
            ]
        ]);
    
        app()->make(FetchSongDataFromMetaDataListener::class)->handle(
            new SongFileUploadedEvent($songFile)
        );
        
        $song = $songFile->fresh()->song;
        
        $this->assertNull($song);
    }
}