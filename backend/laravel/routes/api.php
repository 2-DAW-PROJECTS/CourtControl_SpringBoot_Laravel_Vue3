<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\UserController;
use App\Http\Controllers\AdminController;

use App\Http\Controllers\SportController;

Route::middleware(['admin'])->group(function () {
    Route::post('/admin/auth/login', [AdminController::class, 'generateToken']);
});

Route::get('/sports', [SportController::class, 'index']);
Route::get('/sports/{id}', [SportController::class, 'show']);
Route::post('/sports', [SportController::class, 'store']);
Route::put('/sports/{id}', [SportController::class, 'update']);
Route::delete('/sports/{id}', [SportController::class, 'destroy']);

// Route::post('/users/check-admin', [UserController::class, 'checkAdmin']);