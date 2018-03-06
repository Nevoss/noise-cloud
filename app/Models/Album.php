<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia\HasMediaTrait;
use Spatie\MediaLibrary\HasMedia\Interfaces\HasMedia;

class Album extends Model implements HasMedia
{
    use HasMediaTrait;
    
    /**
     * no guarded fields
     *
     * @var array
     */
    protected $guarded = [];
}
