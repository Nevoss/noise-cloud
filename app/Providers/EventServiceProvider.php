<?php

namespace App\Providers;

use App\Events\Music\SongFileUploadedEvent;
use App\Events\UserRegisteredEvent;
use App\Listeners\Music\SongFileUploaded\FindSongMetaDataListener;
use App\Listeners\UserRegistered\FetchUserPhotoListener;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [
        SongFileUploadedEvent::class => [
            FindSongMetaDataListener::class
        ],
        UserRegisteredEvent::class => [
            FetchUserPhotoListener::class
        ]
    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        parent::boot();

        //
    }
}
