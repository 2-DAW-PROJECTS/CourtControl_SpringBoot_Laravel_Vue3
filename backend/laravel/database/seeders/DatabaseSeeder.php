<?php
// backend/laravel/database/seeders/DatabaseSeeder.php


namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            SportsTableSeeder::class,
            LessonsTableSeeder::class,
            PositionsTableSeeder::class,
            CourtsTableSeeder::class,
            UsersTableSeeder::class,
            EmployeesTableSeeder::class,
            ClientsTableSeeder::class,
            PartnersTableSeeder::class,
            EventualsTableSeeder::class,
            BookingsTableSeeder::class,
            DiscountsTableSeeder::class,
        ]);

        // $this->call(TableSeeder::class);
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
    }
}