<?php

use App\Models\Album;
use App\Models\Artist;
use Faker\Generator as Faker;

$factory->define(Album::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'published_date' => $faker->date(),
        'artist_id' => function () {
            return factory(Artist::class)->create()->id;
        }
    ];
});
