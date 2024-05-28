<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Course>
 */
class CourseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'day' => $this->faker->randomElement(["0", "1", "2", "3", "4", "5", "6"]),
            'starts_at' => $this->faker->time('H:i'),
            'ends_at' => $this->faker->time('H:i'),
            'group_subject_id' => null,
            'class_room_id' => null,
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
