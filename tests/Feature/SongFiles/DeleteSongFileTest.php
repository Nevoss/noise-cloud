<?php
namespace Tests;

use App\Models\User;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Support\Facades\Storage;

class DeleteSongFileTest extends TestCase
{
    /** @test */
    public function a_user_can_delete_his_song_file()
    {
        $this->withoutExceptionHandling();
        
        $user = create(User::class);
        
        $songFile = $this->createFakeSongFile($user);
        
        $this->deleteAsUser(route('song-files.delete', $songFile), [], $user);
        
        Storage::disk('songs')->assertMissing($songFile->path);
        
        $this->assertDatabaseMissing('song_files', [
            'id' => $songFile->id,
            'original_name' => $songFile->original_name,
        ]);
    }
    
    /** @test */
    public function user_cant_delete_another_user_song()
    {
        $this->withoutExceptionHandling();
    
        $this->expectException(AuthorizationException::class);
        
        $user = create(User::class);
    
        $songFile = $this->createFakeSongFile();
    
        $this->deleteAsUser(route('song-files.delete', $songFile), [], $user);
    }
}