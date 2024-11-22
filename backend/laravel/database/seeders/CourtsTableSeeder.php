<?php

namespace Database\Seeders;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CourtsTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('courts')->insert([
            [
                'sport_id' => 1,
                'type_pista' => 'v_playa',
                'name_pista' => 'Playa',
                'ancho' => '16 m x 8 m',
                'description' => 'Pista de voleibol en la playa.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'sport_id' => 1,
                'type_pista' => 'v_pista',
                'name_pista' => 'Pista',
                'ancho' => '18 m x 9 m',
                'description' => 'Pista de voleibol en pista cubierta.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'sport_id' => 1,
                'type_pista' => 'v_asfalto',
                'name_pista' => 'Asfalto',
                'ancho' => '18 m x 9 m',
                'description' => 'Pista de voleibol en asfalto.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'sport_id' => 1,
                'type_pista' => 'v_parquet',
                'name_pista' => 'Parque',
                'ancho' => '18 m x 9 m',
                'description' => 'Pista de voleibol en parquet.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'sport_id' => 2,
                'type_pista' => 'b_parquet',
                'name_pista' => 'Pista Dura',
                'ancho' => '28 m x 15 m',
                'description' => 'Pista de baloncesto en parquet.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'sport_id' => 2,
                'type_pista' => 'b_asfalto',
                'name_pista' => 'Parque',
                'ancho' => '28 m x 15 m',
                'description' => 'Pista de baloncesto en asfalto.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'sport_id' => 2,
                'type_pista' => 'b_3x3',
                'name_pista' => 'A elección',
                'ancho' => '14 m x 15 m',
                'description' => 'Pista de baloncesto 3x3.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}