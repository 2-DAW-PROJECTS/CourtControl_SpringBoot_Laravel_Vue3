<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BookingsTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('bookings')->insert([
            [
                'client_id' => 1,
                'court_id' => 1,
                'booking_time' => now()->addDays(1),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'client_id' => 2,
                'court_id' => 2,
                'booking_time' => now()->addDays(2),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}