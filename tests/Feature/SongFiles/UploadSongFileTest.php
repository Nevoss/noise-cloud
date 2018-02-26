<?php
namespace Tests;

use App\Events\SongFileUploadedEvent;
use App\Models\SongFile;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Storage;

class UploadSongFileTest extends TestCase
{
    /** @test */
    public function a_user_can_upload_song_file()
    {
        $this->withoutExceptionHandling();
        
        Storage::fake('songs');
        Event::fake();
        
        $user = create(User::class);
        
        $this->postAsUser(route('song-files.store'), [
            'file' => $file = UploadedFile::fake()->create('song.mp3', 20)
        ], $user)->assertStatus(200);
        
        Storage::disk('songs')->assertExists(
            SongFile::generateTempPath($user, $file->hashName())
        );
        
        $songFile = SongFile::find(1);
        
        Event::assertDispatched(SongFileUploadedEvent::class, function ($event) use ($songFile) {
            return $event->songFile->id === $songFile->id;
        });
        
        $this->assertDatabaseHas('song_files', [
            'original_name' => 'song.mp3',
            'process_status' => 0,
            'user_id' => $user->id,
        ]);
    }
    
    /** @test */
    public function it_must_be_an_valid_audio_file()
    {
        $this->postAsUser(route('song-files.store'), [
            'file' => UploadedFile::fake()->image('song.png')
        ])->assertJsonValidationErrors('file');
    }
    
}