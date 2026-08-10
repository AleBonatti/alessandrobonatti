<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;

Route::get('/', function () {
    $url = url()->current();
    $file = Str::contains($url, 'carmen') ? 'data-carmen.json' : 'data-alessandro.json';
    $assets = Str::contains($url, 'carmen') ? 'carmen' : 'alessandro';

    $data = json_decode(file_get_contents(resource_path("json/$file")));

    return view('index', compact('data', 'assets'));
});
