<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EmployeesTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('employees')->insert([
            [
                'user_id' => 1,
                'position' => 'Manager',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => 2,
                'position' => 'Coach',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}