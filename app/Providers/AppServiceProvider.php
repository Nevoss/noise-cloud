<?php

namespace App\Providers;

use App\Models\SongFile;
use App\Observers\SongFileObserver;
use App\Services\Music\SongDataFetcher\Contracts\SongDataFetcherInterface;
use App\Services\Music\SongDataFetcher\LastFmSongDataFetcher;
use App\Services\Music\SongModelManager\contracts\SongModelManagerInterface;
use App\Services\Music\SongModelManager\SongModelManager;
use GuzzleHttp\Client;
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
        $this->registerSongDataFetcher();
        $this->registerSongModelManager();
    }
    
    /**
     * Register Song Data Fetcher Service
     */
    protected function registerSongDataFetcher()
    {
        $this->app->singleton(SongDataFetcherInterface::class, function ($app) {
            return new LastFmSongDataFetcher(
                $app->make(Client::class),
                config('services.last-fm.key'),
                config('services.last-fm.base-url')
            );
        });
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
