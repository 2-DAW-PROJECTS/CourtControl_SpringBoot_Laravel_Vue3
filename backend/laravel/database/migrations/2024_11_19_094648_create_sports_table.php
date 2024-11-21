<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('sports', function (Blueprint $table) {
            $table->id(); // ID único
            $table->string('sport_name'); // Nombre
            $table->string('popularity_level'); // Nivel (Alto,Bajo,Medio (Mos pot servir per al calendar))
            $table->string('required_equipment')->nullable(); // Equipamineto requerido
            $table->integer('max_players')->nullable(); // Máximo de jugadores
            $table->integer('min_players')->nullable(); // Mínimo de jugadores
            $table->integer('match_duration')->nullable(); // Duración del partido (en minuts)
            $table->string('physical_intensity')->nullable(); // Intensidad física (baja, media, alta)
            $table->text('rules')->nullable(); // Reglas
            $table->boolean('isActive')->default(1); // 
            $table->string('icon')->nullable(); // imagen
            $table->text('description')->nullable(); // Descripción
            $table->timestamps(); // Camps created_at y updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sports');
    }
};
