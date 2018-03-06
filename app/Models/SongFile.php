<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class SongFile extends Model
{
    public const PROCESS_STATUS_NONE = 0;
    public const PROCESS_STATUS_FETCH_META = 1;
    public const PROCESS_STATUS_FETCH_SONG_DATA = 2;
    public const PROCESS_STATUS_MOVING_FILE = 3;
    public const PROCESS_STATUS_DONE = 4;
    
    /**
     * Available process status options
     *
     * @var array
     */
    public static $availableStatuses = [
        self::PROCESS_STATUS_NONE,
        self::PROCESS_STATUS_FETCH_META,
        self::PROCESS_STATUS_FETCH_SONG_DATA,
        self::PROCESS_STATUS_MOVING_FILE,
        self::PROCESS_STATUS_DONE,
    ];
    
    /**
     * no guarded fields
     *
     * @var array
     */
    protected $guarded = [];
    
    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'meta' => 'array',
    ];
    
    /**
     * default loaded with
     *
     * @var array
     */
    protected $with = [
        'song',
    ];
    
    /**
     * get the song file public path
     *
     * @return string
     */
    public function getPublicPathAttribute()
    {
        return Storage::disk('songs')->url(
            $this->attributes['path']
        );
    }
    
    /**
     * get the full system path
     *
     * @return string
     */
    public function getFullPathAttribute()
    {
        return Storage::disk('songs')->path(
            $this->attributes['path']
        );
    }
    
    /**
     * relation between SongFile and User
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    
    /**
     * relation between SongFile and Song
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function song()
    {
        return $this->belongsTo(Song::class);
    }
    
    /**
     * change and save process status right away
     *
     * @param $status
     */
    public function changeStatus($status)
    {
        if (!in_array($status, self::$availableStatuses, false)) {
            return;
        }
        
        $this->process_status = $status;
        $this->save();
    }
    
    /**
     * generate Song file path
     *
     * @param User $user
     * @param string $fileName
     * @return string
     */
    public static function generatePath(User $user, $fileName = null)
    {
        $today = Carbon::today();
        
        $path = "{$user->id}/{$today->year}/{$today->month}/{$today->day}";
        
        if ($fileName) {
            $path .= '/' . $fileName;
        }
        
        return $path;
    }
    
    /**
     * generate Song file temp path
     *
     * @param User $user
     * @param string $fileName
     * @return string
     */
    public static function generateTempPath(User $user, $fileName = null)
    {
        $path = "{$user->id}/temp";
        
        if ($fileName) {
            $path .= '/' . $fileName;
        }
        
        return $path;
    }
}
