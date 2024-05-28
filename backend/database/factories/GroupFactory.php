<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Group>
 */
class GroupFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'group_number' => $this->faker->numberBetween(1, 10),
            'students_count' => $this->faker->numberBetween(5, 30),
            'max_students_count' => $this->faker->numberBetween(30, 50), 
            'class' => $this->faker->randomElement(["preschool", "primary", "junior_high_school", "high_school"]),
            'level' => $this->faker->randomElement(["0", "1", "2", "4"]),
            'speciality_id' => null,
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
