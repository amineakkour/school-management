<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\AbsenceReport>
 */
class AbsenceReportFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'reason' => $this->faker->optional()->sentence(5),
            'school_year' => $this->faker->year,
            'quarter' => $this->faker->randomElement(["1", "2", "3"]),
            'student_id' => null,
            'course_id' => null,
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
