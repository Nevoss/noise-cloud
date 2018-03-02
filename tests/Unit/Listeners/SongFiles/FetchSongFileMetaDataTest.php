<?php
namespace Tests;

use App\Events\SongFileUploadedEvent;
use App\Listeners\SongFileUploaded\FetchSongFileMetaDataListener;
use App\Models\SongFile;
use App\Models\User;
use Illuminate\Support\Facades\Storage;

class FetchSongFileMetaDataTest extends TestCase
{
    /** @test */
    public function it_fetch_meta_data_from_the_file()
    {
        $user = create(User::class);
        
        Storage::fake('songs');
        
        $path = SongFile::generateTempPath($user, 'somehash.m4a');
        
        Storage::disk('songs')->put(
            $path,
            Storage::disk('tests')->get('songs/one_of_us-eatliz.m4a')
        );
        
        /** @var SongFile $songFile */
        $songFile = create(SongFile::class, [
            'path' => $path,
            'original_name' => 'one_of_us-eatliz.m4a',
            'user_id' => $user->id
        ]);
        
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