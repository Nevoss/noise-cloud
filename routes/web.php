<?php

Route::fallback(function () {
    return view('index');
});
