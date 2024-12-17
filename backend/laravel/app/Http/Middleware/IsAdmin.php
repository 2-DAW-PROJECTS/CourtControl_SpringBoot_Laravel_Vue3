<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

class IsAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\JsonResponse)  $next
     */
    public function handle(Request $request, Closure $next): JsonResponse
    {
        try {
            $user = auth()->user();
            Log::info('Authenticated user:', ['user' => $user]);

            if ($user == null || $user->type != "ROLE_ADMIN") {
                return response()->json([
                    "error" => "Unauthorized",
                    "received" => $user
                ], 401);
            }

            return $next($request);
        } catch (\Throwable $th) {
            Log::error('Error in IsAdmin middleware:', ['exception' => $th]);

            return response()->json([
                "error" => "Unauthorized by Throw"
            ], 401);
        }
    }
}
/*namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

class IsAdmin
{*/
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\JsonResponse)  $next
     *//*
    public function handle(Request $request, Closure $next): JsonResponse
    {
        try {
            $user = auth()->user();
            Log::info('Authenticated user:', ['user' => $user]);

            if ($user == null || $user->type != "ROLE_ADMIN") {
                return response()->json([
                    "error" => "Unauthorized",
                    "received" => $user
                ], 401);
            }

            return $next($request);
        } catch (\Throwable $th) {
            Log::error('Error in IsAdmin middleware:', ['exception' => $th]);

            return response()->json([
                "error" => "Unauthorized by Throw"
            ], 401);
        }
    }
}*/
