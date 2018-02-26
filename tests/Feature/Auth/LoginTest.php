<?php
namespace Tests;

use App\Models\User;

class LoginTest extends TestCase
{
    /** @test */
    public function a_user_can_login()
    {
        create(User::class, [
            'name' => 'nevo',
            'email' => 'nevos12@gmail.com',
            'password' => bcrypt('secret'),
        ]);
        
        $response = $this->postJson(route('auth.login'), [
            'email' => 'nevos12@gmail.com',
            'password' => 'secret',
        ])->json();
        
        $this->assertArrayHasKey('data', $response);
        $this->assertArrayHasKey('meta', $response);
        
        $this->assertSame($response['data']['name'], 'nevo');
        $this->assertArrayHasKey('token', $response['meta']);
    }
    
    /** @test */
    public function wrong_credacials_throw_error()
    {
        $this->postJson(route('auth.login'), [
            'email' => 'nevos12@gmail.com',
            'password' => 'secret',
        ])->assertJsonValidationErrors('email');
    }
    
    /** @test */
    public function check_if_the_user_logged_in()
    {
        $user = create(User::class);
        
        $this->getAsUser(route('auth.me'), $user)->assertJson([
            'data' => [
                'id' => $user->id
            ]
        ]);
    }
    
    /** @test */
    public function a_user_can_logout()
    {
        $user = create(User::class);
        
        $token = $this->getUserJwtToken($user);
        
        $this->getJson(route('auth.logout'), [
            'Authorization' => "Bearer {$token}",
        ])->assertStatus(200);
        
        $this->getJson(route('auth.me'), [
            'Authorization' => "Bearer {$token}",
        ])->assertStatus(401);
    }
}