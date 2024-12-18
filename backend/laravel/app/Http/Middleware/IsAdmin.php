<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Http;

class IsAdmin
{
    public function handle(Request $request, Closure $next): JsonResponse
    {
        try {
            $email = $request->input('email');
            $password = $request->input('password');

            $response = Http::post('http://localhost:80/api/users/check-admin', [
                'email' => $email,
                'password' => $password,
            ]);

            $responseData = $response->json();

            // Log::info('Respuesta recibida en IsAdmin:', [
            //     'status' => $response->status(),
            //     'data' => $responseData,
            //     '.                                                                                              .' => ".                                                          ."
            // ]);

            if ($response->status() !== 200 || !$responseData['is_admin']) {
                return response()->json([
                    "error" => "Unauthorized",
                    // "response" => $responseData,
                    // "email" => $email,
                    // "password" => $password,
                    // "request" => $request->all(),
                ], 401);
            }

            return $next($request);
        } catch (\Throwable $th) {
            // Log::error('Error in IsAdmin middleware:', ['exception' => $th]);
            return response()->json([
                "error" => "Unauthorized by Throw",
                "received" => isset($responseData) ? $responseData : null
            ], 401);
        }
    }
}