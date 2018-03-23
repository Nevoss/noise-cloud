<?php

namespace App\Http\Controllers\Music;

use App\Events\Music\SongFileUploadedEvent;
use App\Http\Controllers\Controller;
use App\Http\Resources\SongFileResource;
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
     * Get all user songFiles
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        $songFiles = auth()->user()->songFiles;
        
        return SongFileResource::collection($songFiles);
    }
    
    /**
     * store new SongFile
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function store()
    {
        request()->validate([
            'file' => 'required|file|mimetypes:audio/mpeg,audio/x-wav,audio/mp4,audio/x-m4a'
        ]);
        
        /** @var User $user */
        $user = auth()->user();
        
        /** @var File $file */
        $file = request()->file('file');
        
        $path = $file->store(SongFile::generateTempPath($user), 'songs');
        
        $songFile = $user->songFiles()->create([
            'original_name' => $file->getClientOriginalName(),
            'file_name' => $file->hashName(),
            'path' => $path,
        ]);
    
        SongFileUploadedEvent::dispatch($songFile);
        
        return response()->json(null, 200);
    }
    
    /**
     * A user can delete SongFile
     *
     * @param SongFile $songFile
     * @return \Illuminate\Http\JsonResponse
     */
    public function delete(SongFile $songFile)
    {
        $this->authorize('delete', $songFile);
        
        $songFile->delete();
        
        return response()->json(null, 200);
    }
}