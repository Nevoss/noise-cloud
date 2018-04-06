<?php

namespace App\Http\Controllers;

use App\Http\Resources\SongFileResource;
use App\Models\SongFile;
use App\Services\Music\SongDataFetcher\Contracts\SongDataFetcherInterface;

class TestController extends Controller
{
    public function index(SongDataFetcherInterface $service)
    {
    
    }
}