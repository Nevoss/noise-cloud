<?php
namespace Tests;

use App\Jobs\Music\ReadId3FromFile;
use App\Models\SongFile;
use App\Models\User;

class ReadId3FromFileTest extends TestCase
{
    /** @test */
    public function it_fetch_meta_data_from_the_file()
    {
        $user = create(User::class);
        
        $songFile = $this->createFakeSongFile($user);
    
        $job = new ReadId3FromFile($songFile);
        dispatch($job);
        
        $this->assertDatabaseHas('song_files', [
            'id' => $songFile->id,
            'process_status' => SongFile::PROCESS_STATUS_FETCH_META
        ]);
        
        $songFile = $songFile->fresh();
        
        $this->assertArraySubset([
            'error' => null,
            'data' => []
        ], $songFile->meta);
        
        $this->assertArraySubset([
            'title' => 'One of Us',
            'artist' => 'Eatliz',
        ], $songFile->meta['data']);
    }
}