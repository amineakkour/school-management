<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Registration>
 */
class RegistrationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'school_year' => $this->faker->year(),
            'student_id' => null,
            'group_id' => null,
            'created_by' => null,
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
