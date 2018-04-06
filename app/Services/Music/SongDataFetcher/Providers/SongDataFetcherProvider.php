<?php

namespace App\Services\Music\SongDataFetcher\Providers;

use App\Services\Music\SongDataFetcher\Contracts\SongDataFetcherInterface;
use App\Services\Music\SongDataFetcher\LastFmSongDataFetcher;
use App\Services\Music\SongDataFetcher\SongDataFetcherFactory;
use App\Services\Music\SongDataFetcher\SpotifySongDataFetcher;
use GuzzleHttp\Client;
use Illuminate\Support\ServiceProvider;

class SongDataFetcherProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
    
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->registerLastFm();
        $this->registerSpotify();
        
        $this->registerFactory();
    }
    
    /**
     * Register the factory if the user bind the interface
     */
    protected function registerFactory()
    {
        $this->app->bind(SongDataFetcherInterface::class, function () {
            $key = config('song-data-fetcher.service');
            
            return SongDataFetcherFactory::make($key);
        });
    }
    
    /**
     * Register Last Fm Service
     */
    protected function registerLastFm()
    {
        $this->app->bind(LastFmSongDataFetcher::class, function ($app) {
            return new LastFmSongDataFetcher(
                $app->make(Client::class),
                config('services.last-fm.key'),
                config('services.last-fm.base-url')
            );
        });
    }
    
    /**
     * Register Spotify Service
     */
    protected function registerSpotify()
    {
        $this->app->bind(SpotifySongDataFetcher::class, function ($app) {
            return new SpotifySongDataFetcher(
            );
        });
    }
}