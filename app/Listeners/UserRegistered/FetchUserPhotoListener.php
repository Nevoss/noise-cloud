<?php

namespace App\Listeners\UserRegistered;

use App\Events\UserRegisteredEvent;
use App\Models\User;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\ClientException;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class FetchUserPhotoListener implements ShouldQueue
{
    use InteractsWithQueue;
    
    /**
     * @var string
     */
    protected $googleGetAvatarUrlFormat = 'http://picasaweb.google.com/data/entry/api/user/%s';
    
    /**
     * @var Client
     */
    protected $httpClient;
    
    
    /**
     * FetchUserPhotoListener constructor.
     *
     * @param Client $httpClient
     */
    public function __construct(Client $httpClient)
    {
        $this->httpClient = $httpClient;
    }
    
    /**
     * Handle the event.
     *
     * @param  UserRegisteredEvent  $event
     * @return void
     */
    public function handle(UserRegisteredEvent $event)
    {
        /** @var User $user */
        $user = $event->user;
        
        $avatarUrl = $this->getUserAvatarFromEmail($user->email);
        
        if (!$avatarUrl) {
            return;
        }
        
        $user->addMediaFromUrl($avatarUrl)->toMediaCollection('avatar');
    }
    
    /**
     * get user avatar url from google api
     *
     * @param $userEmail
     * @return null
     */
    public function getUserAvatarFromEmail($userEmail)
    {
        try {
            $RawResponse = $this->httpClient->get(
                sprintf($this->googleGetAvatarUrlFormat, $userEmail), [
                    'query' => [ 'alt' => 'json' ]
                ]
            );
            
            $response = json_decode($RawResponse->getBody(), true);
            
            return $response['entry']['gphoto$thumbnail']['$t'];
            
        } catch (ClientException $exception) {
            
            return null;
        }
    }
}
