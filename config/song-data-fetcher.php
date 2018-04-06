<?php

return [
    
    /**
     * options: spotify, last=fm
     */
    'service' => 'last-fm',
    
    'services' => [
        
        'spotify' => [
            'key' => env('SPOTIFY_API_KEY'),
            'base-url' => 'http://ws.audioscrobbler.com/2.0',
        ],
    
        'last-fm' => [
            'key' => env('LASTFM_API_KEY'),
            'base-url' => 'http://ws.audioscrobbler.com/2.0',
        ]
        
    ]
    
];
