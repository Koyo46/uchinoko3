<?php

use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

//Post
Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/post', [PostController::class, 'index']);
    Route::post('/post', [PostController::class, 'post']);
    Route::post('/reply', [PostController::class, 'reply']);
});

//Profile
Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/profile', [ProfileController::class, 'update']);
    Route::get('/profile', [ProfileController::class, 'get']);
});
