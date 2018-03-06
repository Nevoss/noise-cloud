<?php
namespace Tests;

use App\Jobs\Music\MoveFileToPermanentPath;
use App\Models\SongFile;
use App\Models\User;
use Illuminate\Support\Facades\Storage;

class MoveFileToPermanentPathTest extends TestCase
{
    /** @test */
    public function it_move_the_file_to_permanent_path()
    {
        $user = create(User::class);
        
        $songFile = $this->createFakeSongFile($user);
    
        $job = new MoveFileToPermanentPath($songFile);
        dispatch($job);
        
        Storage::disk('songs')->assertExists(SongFile::generatePath($songFile->user, $songFile->file_name));
        $this->assertEquals($songFile->fresh()->process_status, SongFile::PROCESS_STATUS_DONE);
    }
}