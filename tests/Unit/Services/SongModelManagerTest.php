<?php
namespace Tests;

use App\Models\Album;
use App\Models\Artist;
use App\Models\Song;
use App\Services\Music\SongModelManager\SongModelManager;
use Illuminate\Support\Facades\Storage;

class SongModelManagerTest extends TestCase
{
    /** @test */
    public function it_fetch_song_from_the_database_if_the_title_and_the_artist_fit()
    {
        $artist = create(Artist::class, [
            'name' => 'Me',
        ]);
        
        $song = create(Song::class, [
            'name' => 'Good Song',
            'artist_id' => $artist->id,
            'album_id' => create(Album::class, [
                'artist_id' => $artist->id
            ]),
        ]);
        
        $songModelManager = app()->make(SongModelManager::class);
        $songFromManager = $songModelManager->firstOrCreate([
            'title' => 'Good Song',
            'artist' => 'Me',
        ]);
        
        $this->assertEquals($songFromManager->id, $song->id);
        $this->assertEquals($songFromManager->name, $song->name);
    }
    
    /** @test */
    public function it_create_song_model_base_on_the_options_fetch_from_api()
    {
        Storage::fake('media');
        
        $songModelManager = app()->make(SongModelManager::class);
        $songFromManager = $songModelManager->firstOrCreate([
            'title' => 'One Of Us',
            'artist' => 'Eatliz',
        ]);
        
        $this->assertInstanceOf(Song::class, $songFromManager);
        
        $this->assertDatabaseHas('songs', [
            'name' => 'One Of Us',
        ]);
        
        $this->assertDatabaseHas('artists', [
            'name' => 'Eatliz',
        ]);

        $this->assertDatabaseHas('albums', [
            'name' => 'All Of It',
        ]);
        
        $this->assertNotEmpty(Album::find(1)->getFirstMediaUrl());
    }
    
    /** @test */
    public function it_returns_null_if_no_found_song_in_database_and_in_api()
    {
        $songModelManager = app()->make(SongModelManager::class);
        $songFromManager = $songModelManager->firstOrCreate([
            'title' => '',
            'artist' => '',
        ]);
        
        $this->assertNull($songFromManager);
    }
}