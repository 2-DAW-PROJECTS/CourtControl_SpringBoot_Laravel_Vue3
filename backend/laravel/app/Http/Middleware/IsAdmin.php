<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class IsAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        try {
            if (auth()->user() == null || auth()->user()->type != "admin") {
                return response()->json([
                    "error" => "Unauthorized"
                ], 401);
            }
            return $next($request);
        } catch (\Throwable $th) {
            return response()->json([
                "error" => "Unauthorized"
            ], 401);
        }
    }
}
