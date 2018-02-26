<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;

class MeController extends Controller
{
    /**
     * MeController constructor.
     */
    public function __construct()
    {
        $this->middleware('jwt.auth');
    }
    
    /**
     * validate if the the user is signIn
     *
     * @return UserResource
     */
    public function show()
    {
        return new UserResource(request()->user());
    }
    
}