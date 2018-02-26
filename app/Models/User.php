<?php

namespace App\Models;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Spatie\Image\Manipulations;
use Spatie\MediaLibrary\HasMedia\HasMediaTrait;
use Spatie\MediaLibrary\HasMedia\Interfaces\HasMediaConversions;
use Spatie\MediaLibrary\Media;

class User extends Authenticatable implements HasMediaConversions
{
    use Notifiable, HasMediaTrait;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];
    
    /**
     * User has a lot of song files
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function songFiles()
    {
        return $this->hasMany(SongFile::class);
    }
    
    /**
     * do manipulation on the media images that will provide
     *
     * @param Media|null $media
     */
    public function registerMediaConversions(Media $media = null)
    {
        $this->addMediaConversion('small')
            ->fit(Manipulations::FIT_CROP, 32, 32)
            ->shouldBePerformedOn('avatar');
        
        $this->addMediaConversion('medium')
            ->fit(Manipulations::FIT_CROP, 64, 64)
            ->shouldBePerformedOn('avatar');
    }
    
    
}
