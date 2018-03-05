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
     * relation between song and artist
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function artist()
    {
        return $this->belongsTo(Artist::class);
    }
}
