<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Exam>
 */
class ExamFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence,
            'max_grade' => $this->faker->numberBetween(1, 100),
            'document_url' => $this->faker->optional()->url(), 
            'version' => $this->faker->randomLetter, 
            'versions_number' => $this->faker->randomDigitNotNull, 
            'school_year' => $this->faker->numberBetween(1, 12), 
            'quarter' => $this->faker->randomElement([1, 2, 3]), 
            'group_subject_id' => null,
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
