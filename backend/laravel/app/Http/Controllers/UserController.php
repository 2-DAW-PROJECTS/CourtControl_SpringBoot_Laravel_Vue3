<?php

namespace App\Http\Controllers;

use App\Http\Requests\CheckAdminRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\JsonResponse;

class UserController extends Controller
{
    public function checkAdmin(CheckAdminRequest $request): JsonResponse
    {

        Log::info('Datos recibidos en checkAdmin:', [
            'email' => $request->email,
            'password' => $request->password,
        ]);


        $user = User::where('email', $request->email)->first();

        if ($user) {
            Log::info('Contraseña encriptada recibida de la base de datos:', [
                'email' => $user->email,
                'password' => $user->password,
                '.                                                                                              .' => ".                                                          ."
            ]);
        }

        if ($user && Hash::check($request->password, $user->password) && $user->type === 'ADMIN') {
            Log::info('La contraseña es correcta',['user' => $user]);
            return response()->json(['is_admin' => true, 'user' => new UserResource($user)]);
        }

        return response()->json(['is_admin' => false], 401);
    }
}