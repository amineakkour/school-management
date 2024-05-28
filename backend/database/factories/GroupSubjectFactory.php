<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\GroupSubject>
 */
class GroupSubjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'teacher_id' => null,
            'group_id' => null,
            'subject_id' => null,
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
