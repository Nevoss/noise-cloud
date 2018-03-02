<?php

if (app()->environment() === 'local') {
    Route::get('/test', 'TestController@index');
}

Route::fallback(function () {
    return view('index');
});
