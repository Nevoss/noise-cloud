<?php

namespace App\Services\Music\SongDataFetcher;

use App\Services\Music\SongDataFetcher\Contracts\SongDataFetcherInterface;
use App\Services\Music\SongDataFetcher\Responses\SongResponse;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\BadResponseException;

class LastFmSongDataFetcher implements  SongDataFetcherInterface
{
    /**
     * @var Client
     */
    protected $httpClient;
    
    /**
     * @var string
     */
    protected $apiKey;
    
    /**
     * @var string
     */
    protected $apiBaseUrl;
    
    /**
     * LastFmSongDataFetcher constructor.
     *
     * @param Client $httpClient
     * @param string $apiKey
     * @param string $apiBaseUrl
     */
    public function __construct(Client $httpClient, $apiKey, $apiBaseUrl)
    {
        $this->httpClient = $httpClient;
        $this->apiKey = $apiKey;
        $this->apiBaseUrl = $apiBaseUrl;
    }
    
    /**
     * search track request
     *
     * @param $title
     * @param $artist
     * @return SongResponse|null
     */
    public function getSongInfo($title, $artist)
    {
        $response = $this->makeRequest('GET', 'track.getInfo', [
            'track' => $title,
            'artist' => $artist,
            'autocorrect' => 1,
        ]);
        
        if (!$response) {
            return null;
        }
        
        return SongResponse::create([
            'title' => array_get($response, 'track.name'),
            'artist' => array_get($response, 'track.artist.name'),
            'artistImage' => array_get($response, 'track.artist.image.2.#text'),
            'album' => array_get($response, 'track.album.title'),
            'albumImage' => array_get($response, 'track.album.image.2.#text')
        ]);
    }
    
    /**
     * Create an http request to last-fm api
     *
     * @param $method
     * @param $apiMethod
     * @param $params
     * @return bool|mixed
     */
    protected function makeRequest($method, $apiMethod, $params)
    {
        try {
            $response = $this->httpClient->request($method, $this->apiBaseUrl, [
                'query' => array_merge([
                    'api_key' => $this->apiKey,
                    'method' => $apiMethod,
                    'format' => 'json'
                ], $params)
            ]);
            
            return json_decode($response->getBody(), 'true');
            
        } catch (BadResponseException $e) {
            
            return false;
            
        }
    }
    
    
}