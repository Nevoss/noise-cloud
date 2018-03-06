<?php

namespace Tests;

use App\Events\SongFileUploadedEvent;
use App\Jobs\Music\AssociateSongFileWithSongModel;
use App\Models\Song;
use App\Models\SongFile;
use App\Models\User;
use App\Services\Music\SongModelManager\contracts\SongModelManagerInterface;
use App\Services\Music\SongModelManager\SongModelManagerFake;

class AssociateSongFileWithSongModelTest extends TestCase
{
    public function setUp()
    {
        parent::setUp();
    
        app()->bind(SongModelManagerInterface::class, SongModelManagerFake::class);
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
    
        $job = new AssociateSongFileWithSongModel($songFile);
        dispatch($job);
        
        $songFile = $songFile->fresh();
        
        $this->assertEquals(SongFile::PROCESS_STATUS_FETCH_SONG_DATA ,$songFile->process_status);
        
        $this->assertNotNull($songFile->song);
        $this->assertInstanceOf(Song::class, $songFile->song);
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
    
        $job = new AssociateSongFileWithSongModel($songFile);
        dispatch($job);
        
        $song = $songFile->fresh()->song;
        
        $this->assertNull($song);
    }
}