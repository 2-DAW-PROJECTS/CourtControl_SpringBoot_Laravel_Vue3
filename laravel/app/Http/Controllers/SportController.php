<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Sport;

class SportController extends Controller
{
    // Método para obtener todos los deportes
    public function index()
    {
        return Sport::all();
    }

    // Método para obtener un deporte por ID
    public function show($id)
    {
        return Sport::find($id);
    }

    // Método para crear un nuevo deporte
    public function store(Request $request)
    {
        $sport = Sport::create($request->all());
        return response()->json($sport, 201);
    }

    // Método para actualizar un deporte existente
    public function update(Request $request, $id)
    {
        $sport = Sport::findOrFail($id);
        $sport->update($request->all());
        return response()->json($sport, 200);
    }

    // Método para eliminar un deporte
    public function destroy($id)
    {
        Sport::destroy($id);
        return response()->json(null, 204);
    }
}