<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Illuminate\Support\Facades\Log;
use Exception;

class AdminController extends Controller
{
    public function generateToken(Request $request)
    {
        try {
            // Log::info('Request received: ', $request->all());

            $email = $request->input('email');
            $password = $request->input('password');

            if (empty($email) || empty($password)) {
                return response()->json(['message' => 'Email and password are required'], 400);
            }

            $payload = [
                'iss' => "https://github.com/2-DAW-PROJECTS/CourtControl_SpringBoot_Laravel_Vue3", // Emisor del token
                'sub' => $email, // Sujeto del token (email del usuario)
                'iat' => time(),
                'exp' => time() + 60*60 // 1 hora
            ];

            $jwt = JWT::encode($payload, env('JWT_SECRET'), 'HS256');

            // Log::info('Token JWT generado: ', ['token' => $jwt]);

            return response()->json(['message' => 'Token generated successfully', 'token' => $jwt]);


        } catch (Exception $e) {
            Log::error('Error generating token: ' . $e->getMessage());
            return response()->json(['message' => 'An error occurred while generating the token'], 500);
        }
    }
}