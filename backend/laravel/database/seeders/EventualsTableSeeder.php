<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EventualsTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('eventuals')->insert([
            [
                'client_id' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}