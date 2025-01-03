<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class IsAdmin
{
    public function handle(Request $request, Closure $next): JsonResponse
    {
        Log::info('Has llegado a laravel, eres un makina (ACTUALIZADO-2):', [
            'request' => $request
        ]);

        try {
            $email = $request->input('email');
            $password = $request->input('password');

            $user = User::where('email', $email)->first();

            if ($user) {
                $passwordMatches = Hash::check($password, $user->password);

                $isAdmin = $user->roles()->where('name', 'ADMIN')->exists();

                if ($passwordMatches && $isAdmin) {
                    return $next($request);
                }
            }

            return response()->json(['error' => 'Unauthorized'], 401);
        } catch (\Throwable $th) {
            Log::error('Error in IsAdmin middleware:', ['exception' => $th]);
            return response()->json([
                'error' => 'Unauthorized by Throw',
                'received' => isset($responseData) ? $responseData : null
            ], 401);
        }
    }
}

