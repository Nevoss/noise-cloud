<?php

use App\Models\SongFile;
use App\Models\User;
use Faker\Generator as Faker;

$factory->define(SongFile::class, function (Faker $faker) {
    return [
        'original_name' => $faker->name,
        'path' => 'path/to/file/' . $faker->name,
        'process_status' => SongFile::PROCESS_STATUS_NONE,
        'user_id' => function () {
            factory(User::class)->create()->id;
        }
    ];
});
