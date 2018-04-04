<?php
namespace Tests;

use App\Models\Album;
use App\Models\Artist;
use App\Models\Song;
use App\Services\Music\SongModelManager\SongModelManager;
use GuzzleHttp\Client;
use GuzzleHttp\Handler\MockHandler;
use GuzzleHttp\HandlerStack;
use GuzzleHttp\Psr7\Response;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class SongModelManagerTest extends TestCase
{
    
    /** @test */
    public function it_fetch_song_from_the_database_if_the_title_and_the_artist_fit()
    {
        $this->withoutExceptionHandling();
        
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
        $this->withoutExceptionHandling();
        
        Storage::fake('media');
    
        app()->instance(Client::class, $this->mockedHttpRequest(
            json_encode(
                [ 'track' => [ 'name' => 'One Of Us', 'artist' => [ 'name' => 'Eatliz' ], 'album' => [ 'title' => 'All Of It' ] ] ]
            )
        ));
        
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
    }
    
    /** @test */
    public function it_returns_null_if_no_found_song_in_database_and_in_api()
    {
        app()->instance(Client::class, $this->mockedHttpRequest(
            null, 404
        ));
        
        Log::shouldReceive('error')
            ->once();
        
        $songModelManager = app()->make(SongModelManager::class);
        $songFromManager = $songModelManager->firstOrCreate([
            'title' => '',
            'artist' => '',
        ]);
        
        $this->assertNull($songFromManager);
    }
    
    /**
     * @param $body
     * @param int $status
     * @return Client
     */
    private function mockedHttpRequest($body, $status = 200)
    {
        return new Client([
            'handler' => HandlerStack::create(
                new MockHandler([
                    new Response($status, [], $body)
                ])
            )
        ]);
    }
}