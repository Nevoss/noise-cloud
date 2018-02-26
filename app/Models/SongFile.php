<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class SongFile extends Model
{
    const PROCESS_STATUS_NONE = 0;
    const PROCESS_STATUS_WORKING = 1;
    const PROCESS_STATUS_DONE = 2;
    
    /**
     * no guarded fields
     *
     * @var array
     */
    protected $guarded = [];
    
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
