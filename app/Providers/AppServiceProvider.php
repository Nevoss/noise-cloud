<?php

namespace App\Providers;

use App\Models\SongFile;
use App\Observers\SongFileObserver;
use App\Services\Music\SongDataFetcher\Contracts\SongDataFetcherInterface;
use App\Services\Music\SongModelManager\contracts\SongModelManagerInterface;
use App\Services\Music\SongModelManager\SongModelManager;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        SongFile::observe(SongFileObserver::class);
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->registerSongModelManager();
    }
    
    /**
     * Register SongModelManager
     */
    protected function registerSongModelManager()
    {
        $this->app->bind(SongModelManagerInterface::class, function ($app) {
            return new SongModelManager(
                $app->make(SongDataFetcherInterface::class)
            );
        });
    }
}
