<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use Illuminate\Support\Facades\DB;
use App\Models\Sport;

class SportsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('sports')->insert([
            [
                'sport_name' => 'Baloncesto',
                'popularity_level' => 'Alta',
                'required_equipment' => 'Balón, Aro, Cancha',
                'max_players' => 10,
                'min_players' => 5,
                'match_duration' => 48,
                'physical_intensity' => 'Alta',
                'rules' => 'Los equipos anotan encestando el balón en el aro del equipo contrario.',
                'isActive' => 1,
                'icon' => 'baloncesto.png',
                'description' => 'Un deporte de ritmo rápido jugado en una cancha con aros en ambos extremos.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'sport_name' => 'Voleibol',
                'popularity_level' => 'Alta',
                'required_equipment' => 'Balón, Red',
                'max_players' => 12,
                'min_players' => 6,
                'match_duration' => 60,
                'physical_intensity' => 'Media',
                'rules' => 'Los equipos anotan puntos haciendo que el balón toque el suelo en el campo contrario.',
                'isActive' => 1,
                'icon' => 'voleibol.png',
                'description' => 'Un deporte de equipo jugado con un balón sobre una red, popular en todo el mundo.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

            // Sport::factory()->count(10)->create();
    }
}
