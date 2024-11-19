<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Sport;
use App\Http\Requests\StoreSportRequest;
use App\Http\Requests\UpdateSportRequest;
use App\Http\Resources\SportResource;

class SportController extends Controller
{
    // Método para obtener todos los deportes
    public function index()
    {
        return SportResource::collection(Sport::all());
    }

    // Método para obtener un deporte por ID
    public function show($id)
    {
        return new SportResource(Sport::find($id));
    }

    // Método para crear un nuevo deporte
    public function store(StoreSportRequest $request)
    {
        $sport = Sport::create($request->validated());
        return new SportResource($sport);
    }

    // Método para actualizar un deporte existente
    public function update(UpdateSportRequest $request, $id)
    {
        $sport = Sport::findOrFail($id);
        $sport->update($request->validated());
        return new SportResource($sport);
    }

    // Método para eliminar un deporte
    public function destroy($id)
    {
        Sport::destroy($id);
        return response()->json(null, 204);
    }
}