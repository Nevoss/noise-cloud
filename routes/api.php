<?php

/**
 * Auth routes
 */
Route::get('/me', 'Auth\MeController@show')->name('auth.me');
Route::post('/login', 'Auth\LoginController@login')->name('auth.login');
Route::post('/register', 'Auth\RegisterController@register')->name('auth.register');
Route::get('/logout', 'Auth\LoginController@logout')->name('auth.logout');

Route::get('/song-files', 'Music\SongFilesController@index')->name('song-files.index');
Route::delete('/song-files/{songFile}', 'Music\SongFilesController@delete')->name('song-files.delete');
Route::post('/song-files/upload', 'Music\SongFilesController@store')->name('song-files.store');