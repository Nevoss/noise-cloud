<?php

namespace App\Http\Controllers\Music;

use App\Events\SongFileUploadedEvent;
use App\Http\Controllers\Controller;
use App\Models\SongFile;
use App\Models\User;
use Illuminate\Http\File;

class SongFilesController extends Controller
{
    /**
     * UploadSongFiles constructor.
     */
    public function __construct()
    {
        $this->middleware('jwt.auth');
    }
    
    /**
     * store new SongFile
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function store()
    {
        request()->validate([
            'file' => 'required|file|mimetypes:audio/mpeg,audio/x-wav,audio/mp4'
        ]);
        
        /** @var User $user */
        $user = auth()->user();
        
        /** @var File $file */
        $file = request()->file('file');
        
        $path = $file->store(SongFile::generateTempPath($user), 'songs');
        
        $songFile = $user->songFiles()->create([
            'original_name' => $file->getClientOriginalName(),
            'path' => $path,
        ]);
    
        SongFileUploadedEvent::dispatch($songFile);
        
        return response()->json(null, 200);
    }
}