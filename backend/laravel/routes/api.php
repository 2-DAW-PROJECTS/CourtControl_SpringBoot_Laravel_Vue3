<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\SportController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});




// Rutas para el controlador SportController
Route::get('/sports', [SportController::class, 'index']);
Route::get('/sports/{id}', [SportController::class, 'show']);
Route::post('/sports', [SportController::class, 'store']);
Route::put('/sports/{id}', [SportController::class, 'update']);
Route::delete('/sports/{id}', [SportController::class, 'destroy']);