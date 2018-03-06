<?php

namespace App\Http\Controllers;

use App\Http\Resources\SongFileResource;
use App\Models\SongFile;

class TestController extends Controller
{
    public function index()
    {
        return SongFileResource::collection(SongFile::get());
    }
}