<?php

namespace App\Http\Controllers\Auth;

use App\Http\Resources\UserResource;
use App\Http\Controllers\Controller;
use Illuminate\Validation\ValidationException;
use Tymon\JWTAuth\JWTAuth;

class LoginController extends Controller
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
        
        $this->middleware('jwt.auth')->only('logout');
    }
    
    /**
     * login user into the app
     *
     * @return UserResource
     *
     * @throws ValidationException
     */
    public function login()
    {
        if(!$token = $this->jwtAuth->attempt(request()->all('email', 'password'))) {
            $this->sendFailedLoginResponse();
        }
        
        return (new UserResource(request()->user()))->additional(['meta' => [
            'token' => $token
        ]]);
    }
    
    /**
     * invalidate user token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        $this->jwtAuth->invalidate($this->jwtAuth->getToken());
        
        return response()->json(null);
    }
    
    /**
     * Validate login request
     */
    protected function validateLogin()
    {
        request()->validate([
            'email' => 'required|string',
            'password' => 'required|string',
        ]);
    }
    
    /**
     * send failed login response
     *
     * @throws ValidationException
     */
    protected function sendFailedLoginResponse()
    {
        throw ValidationException::withMessages([
            'email' => [trans('auth.failed')],
        ]);
    }
}
