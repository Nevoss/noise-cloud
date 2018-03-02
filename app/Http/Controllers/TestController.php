<?php

namespace App\Http\Controllers;

use App\Models\SongFile;

class TestController extends Controller
{
    public function index(\getID3 $id3Reader)
    {
        $songFile = SongFile::latest()->first();
        
        dd($id3Reader->analyze($songFile->full_path));
    }
}