<?php
namespace Tests;

use App\Events\UserRegisteredEvent;
use App\Models\User;
use Illuminate\Support\Facades\Event;

class RegistrationTest extends TestCase
{
    protected function setUp()
    {
        parent::setUp();
        
        Event::fake();
    }
    
    
    /** @test */
    public function a_visitor_can_register()
    {
        $this->withoutExceptionHandling();
        
        $response = $this->postJson(route('auth.register'), [
            'name' => 'Nevo Golan',
            'email' => 'nevos12@gmail.com',
            'password' => '123123',
        ])->json();
        
        $this->assertArrayHasKey('token', $response['meta']);
        
        $this->assertDatabaseHas('users', [
            'name' => 'Nevo Golan',
            'email' => 'nevos12@gmail.com'
        ]);
        
        $user = User::find(1);
        
        Event::assertDispatched(UserRegisteredEvent::class, function ($event) use ($user) {
            return $event->user->id === $user->id;
        });
    }
    
    /** @test */
    public function name_must_be_valid()
    {
        $this->postJson(route('auth.register'), [
            'name' => '',
            'email' => 'nevos12@gmail.com',
            'password' => '123123',
        ])->assertJsonValidationErrors('name');
    }
    
    /** @test */
    public function password_must_be_valid()
    {
        $this->postJson(route('auth.register'), [
            'name' => 'asda as',
            'email' => 'nevos12@gmail.com',
            'password' => '',
        ])->assertJsonValidationErrors('password');
        
        $this->postJson(route('auth.register'), [
            'name' => 'asda as',
            'email' => 'asda1212@gmail.com',
            'password' => '123',
        ])->assertJsonValidationErrors('password');
    }
    
    /** @test */
    public function email_must_be_valid()
    {
        $this->postJson(route('auth.register'), [
            'name' => 'aasdasd',
            'email' => '',
            'password' => '123123',
        ])->assertJsonValidationErrors('email');
        
        $this->postJson(route('auth.register'), [
            'name' => 'aasdasd',
            'email' => 'sdasda sadsa',
            'password' => '123123',
        ])->assertJsonValidationErrors('email');
        
        create(User::class, [
            'email' => 'nevos12@gmail.com'
        ]);
    
        $this->postJson(route('auth.register'), [
            'name' => 'asd asd',
            'email' => 'nevos12@gmail.com',
            'password' => '123123',
        ])->assertJsonValidationErrors('email');
    }
}