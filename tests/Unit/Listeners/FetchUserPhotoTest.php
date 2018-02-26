<?php
namespace Tests;

use App\Events\UserRegisteredEvent;
use App\Listeners\UserRegistered\FetchUserPhotoListener;
use App\Models\User;
use Illuminate\Support\Facades\Storage;

class FetchUserPhotoTest extends TestCase
{
    /** @test */
    public function it_gets_a_google_plus_photo_from_user_email()
    {
        Storage::fake('media');
        
        $this->withoutExceptionHandling();
        
        $user = create(User::class, [
            'email' => 'nevos12@gmail.com'
        ]);
        
        $event = new UserRegisteredEvent($user);
        
        $this->app->make(FetchUserPhotoListener::class)->handle($event);
        
        $media = $user->getMedia('avatar');
        
        $this->assertCount(1, $media);
    }    
    
    /** @test */
    public function it_not_adding_a_avatar_if_the_email_is_not_valid_for_google()
    {
        Storage::fake('media');
    
        $user = create(User::class, [
            'email' => 'fake@fakemailfakemail.com'
        ]);
    
        $event = new UserRegisteredEvent($user);
    
        $this->app->make(FetchUserPhotoListener::class)->handle($event);
    
        $media = $user->getMedia('avatar');
    
        $this->assertCount(0, $media);
    }
}