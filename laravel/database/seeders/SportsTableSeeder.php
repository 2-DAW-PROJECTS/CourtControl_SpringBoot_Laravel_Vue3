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
                'sport_name' => 'Fútbol',
                'popularity_level' => 'Alta',
                'required_equipment' => 'Balón, Porterías, Botas',
                'max_players' => 22,
                'min_players' => 10,
                'match_duration' => 90,
                'physical_intensity' => 'Alta',
                'rules' => 'Dos equipos compiten para anotar goles llevando el balón a la portería contraria.',
                'isActive' => true,
                'icon' => 'futbol.png',
                'description' => 'El deporte más popular del mundo, jugado en un campo rectangular con porterías en ambos extremos.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'sport_name' => 'Baloncesto',
                'popularity_level' => 'Alta',
                'required_equipment' => 'Balón, Aro, Cancha',
                'max_players' => 10,
                'min_players' => 5,
                'match_duration' => 48,
                'physical_intensity' => 'Alta',
                'rules' => 'Los equipos anotan encestando el balón en el aro del equipo contrario.',
                'isActive' => true,
                'icon' => 'baloncesto.png',
                'description' => 'Un deporte de ritmo rápido jugado en una cancha con aros en ambos extremos.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'sport_name' => 'Pádel',
                'popularity_level' => 'Media',
                'required_equipment' => 'Pala de pádel, Pelota',
                'max_players' => 4,
                'min_players' => 2,
                'match_duration' => 60,
                'physical_intensity' => 'Media',
                'rules' => 'Se juega en una cancha cerrada; los jugadores golpean la pelota sobre una red usando palas.',
                'isActive' => true,
                'icon' => 'padel.png',
                'description' => 'Un deporte de raqueta que combina elementos del tenis y el squash.',
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
                'isActive' => true,
                'icon' => 'voleibol.png',
                'description' => 'Un deporte de equipo jugado con un balón sobre una red, popular en todo el mundo.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'sport_name' => 'Tenis',
                'popularity_level' => 'Alta',
                'required_equipment' => 'Raqueta, Pelota, Red',
                'max_players' => 2,
                'min_players' => 2,
                'match_duration' => 120,
                'physical_intensity' => 'Alta',
                'rules' => 'Los jugadores golpean la pelota sobre la red hacia el campo del oponente para sumar puntos.',
                'isActive' => true,
                'icon' => 'tenis.png',
                'description' => 'Un deporte de raqueta jugado en una cancha rectangular, de manera individual o en parejas.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'sport_name' => 'Atletismo',
                'popularity_level' => 'Alta',
                'required_equipment' => 'Zapatillas de correr, Pista',
                'max_players' => 1,
                'min_players' => 1,
                'match_duration' => 5,
                'physical_intensity' => 'Alta',
                'rules' => 'Los atletas compiten en diversas disciplinas de pista y campo buscando el mejor tiempo o distancia.',
                'isActive' => true,
                'icon' => 'atletismo.png',
                'description' => 'Un conjunto de deportes competitivos que incluyen correr, saltar y lanzar.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

            // Sport::factory()->count(10)->create();
    }
}
