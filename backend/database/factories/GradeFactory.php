<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Grade>
 */
class GradeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'grade' => $this->faker->randomFloat(2, 0, 20),
            'comment' => $this->faker->optional()->text(30),
            'exam_id' => null,
            'student_id' => null,
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
