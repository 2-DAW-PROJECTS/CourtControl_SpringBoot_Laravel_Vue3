<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DiscountsTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('discounts')->insert([
            [
                'description' => '10% off on all bookings',
                'percentage' => 10.00,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}