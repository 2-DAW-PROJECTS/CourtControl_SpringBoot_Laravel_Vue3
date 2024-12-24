<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\UserController;
use App\Http\Controllers\AdminController;

use App\Http\Controllers\SportController;


// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::middleware(['admin'])->group(function () {
    // Route::get('/admin/test', function () {
    //     return response()->json(['message' => 'You are an admin nice cock bro']);
    // });
    Route::post('/admin/auth/login', [AdminController::class, 'generateToken']);
});

Route::get('/sports', [SportController::class, 'index']);
Route::get('/sports/{id}', [SportController::class, 'show']);
Route::post('/sports', [SportController::class, 'store']);
Route::put('/sports/{id}', [SportController::class, 'update']);
Route::delete('/sports/{id}', [SportController::class, 'destroy']);

// Route::post('/users/check-admin', [UserController::class, 'checkAdmin']);