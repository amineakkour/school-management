<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Teacher>
 */
class TeacherFactory extends Factory
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
            'phone_number' => $this->faker->unique()->numerify('##########'),
            'birthday' => $this->faker->date(),
            'password' => Hash::make('password'),
            'cin' => $this->faker->unique()->regexify('[A-Za-z0-9]{10}'),
            'address' => $this->faker->address(),
            'photo' => $this->faker->optional()->imageUrl(640, 480, 'people'),
            'blood_type' => $this->faker->optional()->randomElement(['A-', 'A+', 'B-', 'B+', 'AB+', 'AB-', 'O+', 'O-']),
            'gender' => $this->faker->randomElement(['m', 'f']),
            'hire_date' => $this->faker->date(),
            'last_seen' => $this->faker->optional()->dateTime(),
            'has_disability' => $this->faker->boolean(),
            'disability_type' => $this->faker->optional()->text(50),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
