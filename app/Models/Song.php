<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Song extends Model
{
    /**
     * no guarded fields
     *
     * @var array
     */
    protected $guarded = [];
    
    /**
     * default loaded with
     *
     * @var array
     */
    protected $with = [
        'artist',
        'album',
    ];
    
    /**
     * relation between song and artist
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function artist()
    {
        return $this->belongsTo(Artist::class);
    }
    
    /**
     * relation between song and album
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function album()
    {
        return $this->belongsTo(Album::class);
    }
}
