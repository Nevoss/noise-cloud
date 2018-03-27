<?php

namespace Tests;

use App\Models\SongFile;
use App\Models\User;

class GetSongFileTest extends TestCase
{
    /** @test */
    public function a_user_can_get_all_his_song_files()
    {
        $this->withoutExceptionHandling();
        
        $user = create(User::class);
        
        create(SongFile::class, [
            'user_id' => $user->id,
        ], 3);
        
        create(SongFile::class, [], 5);
        
        $response = $this->getAsUser(route('song-files.index'), $user)->json();
        
        $this->assertCount(3, $response['data']);
    }
    
}