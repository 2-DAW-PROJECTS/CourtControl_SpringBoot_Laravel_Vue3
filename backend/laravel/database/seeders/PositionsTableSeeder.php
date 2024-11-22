<?php

namespace Database\Seeders;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PositionsTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('positions')->insert([
            [
                'id_sport' => 1,
                'position_name' => 'Setter',
                'description' => 'El jugador que organiza el ataque del equipo.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_sport' => 1,
                'position_name' => 'Outside-Hitter',
                'description' => 'Jugador que ataca desde las alas.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_sport' => 1,
                'position_name' => 'Middle-Blocker',
                'description' => 'Jugador que bloquea en el centro de la red.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_sport' => 1,
                'position_name' => 'Opposite-Hitter',
                'description' => 'Jugador que ataca desde la posición opuesta al setter.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_sport' => 1,
                'position_name' => 'Libero',
                'description' => 'Jugador especializado en defensa.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_sport' => 2,
                'position_name' => 'Base',
                'description' => 'Jugador que organiza el juego ofensivo.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_sport' => 2,
                'position_name' => 'Alero',
                'description' => 'Jugador que juega en las alas.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_sport' => 2,
                'position_name' => 'Escolta',
                'description' => 'Jugador que ayuda al base en la organización del juego.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_sport' => 2,
                'position_name' => 'Ala-Pivot',
                'description' => 'Jugador que juega cerca del aro y en las alas.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id_sport' => 2,
                'position_name' => 'Pivot',
                'description' => 'Jugador que juega cerca del aro.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}