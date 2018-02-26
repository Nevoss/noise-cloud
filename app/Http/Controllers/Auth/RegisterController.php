<?php

namespace App\Http\Controllers\Auth;

use App\Events\UserRegisteredEvent;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Tymon\JWTAuth\JWTAuth;

class RegisterController extends Controller
{
    /**
     * @var JWTAuth
     */
    protected $jwtAuth;
    
    /**
     * RegisterController constructor.
     *
     * @param JWTAuth $jwtAuth
     */
    public function __construct(JWTAuth $jwtAuth)
    {
        $this->jwtAuth = $jwtAuth;
    }
    
    /**
     * Register a user
     *
     * @return UserResource
     */
    public function register()
    {
        $this->validateRegistration();
        
        $user = User::create(array_merge(
            request()->all('name', 'email'),
            [ 'password' => bcrypt(request('password')) ]
        ));
        
        $token = $this->jwtAuth->attempt(request()->all('email', 'password'));
    
        UserRegisteredEvent::dispatch($user);
        
        return (new UserResource($user))->additional([ 'meta' => [
            'token' => $token,
        ]]);
    }
    
    /**
     * Validate Registration method
     */
    protected function validateRegistration()
    {
        request()->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:users,email',
            'password' => 'required|string|min:4',
        ]);
    }
}