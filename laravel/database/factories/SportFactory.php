<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Sport>
 */
class SportFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'sport_name' => $this->faker->word(),
            'popularity_level' => $this->faker->randomElement(['Alta', 'Media', 'Baja']),
            'required_equipment' => $this->faker->words(3, true),
            'max_players' => $this->faker->numberBetween(2, 22),
            'min_players' => $this->faker->numberBetween(1, 11),
            'match_duration' => $this->faker->numberBetween(30, 120),
            'physical_intensity' => $this->faker->randomElement(['Alta', 'Media', 'Baja']),
            'rules' => $this->faker->sentence(),
            'isActive' => $this->faker->boolean(),
            'icon' => $this->faker->imageUrl(64, 64, 'sports'),
            'description' => $this->faker->paragraph(),
        ];
    }
}
