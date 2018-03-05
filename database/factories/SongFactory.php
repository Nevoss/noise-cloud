<?php

use App\Models\Album;
use App\Models\Artist;
use App\Models\Song;
use Faker\Generator as Faker;

$factory->define(Song::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'artist_id' => function () {
            return factory(Artist::class)->create()->id;
        },
        'album_id' => function () {
            return factory(Album::class)->create()->id;
        }
    ];
});
