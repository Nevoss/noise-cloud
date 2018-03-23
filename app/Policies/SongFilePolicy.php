<?php

namespace App\Policies;

use App\Models\SongFile;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class SongFilePolicy
{
    use HandlesAuthorization;
    
    /**
     * Determine whether the user can delete the songFile.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\SongFile  $songFile
     * @return boolean
     */
    public function delete(User $user, SongFile $songFile)
    {
        return $user->id === $songFile->user->id;
    }
}
