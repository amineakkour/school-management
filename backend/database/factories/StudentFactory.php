<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Student>
 */
class StudentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'first_name' => $this->faker->firstName(),
            'last_name' => $this->faker->lastName(),
            'email' => $this->faker->unique()->safeEmail(),
            'phone_number' => $this->faker->optional()->numerify('##########'),
            'password' => Hash::make('password'),
            'cin' => $this->faker->optional()->numerify('########'),
            'address' => $this->faker->address(),
            'birthday' => $this->faker->date(),
            'photo' => $this->faker->optional()->imageUrl(640, 480, 'people'),
            'blood_type' => $this->faker->optional()->randomElement(['A-', 'A+', 'B-', 'B+', 'AB+', 'AB-', 'O+', 'O-']),
            'gender' => $this->faker->randomElement(['m', 'f']),
            'last_seen' => $this->faker->optional()->dateTime(),
            'has_disability' => $this->faker->boolean(),
            'disability_type' => function ($attributes) {
                return $attributes["has_disability"] ? implode(' ', fake()->words()) : null;
            },
            'parent_full_name' => $this->faker->name(),
            'parent_phone_number' => $this->faker->numerify('##########'),
            "parenting_job" => implode(' ', fake()->words(2)),
            'parent_blood_type' => $this->faker->optional()->randomElement(['A-', 'A+', 'B-', 'B+', 'AB+', 'AB-', 'O+', 'PO-']),
            'created_at' => now(),
            'updated_at' => null,
        ];
    }
}
