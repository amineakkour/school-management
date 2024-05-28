<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PreRegistration>
 */
class PreRegistrationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "fullname" => fake()->name(),
            "email" => fake()->email(),
            "phone_number" => null,
            "classe" => implode(' ', fake()->words()),
            "address" => fake()->address(),
            "birthday" => fake()->date(),
            "has_disability" => fake()->boolean(10),
            "disability_type" => function ($attributes) {
                return $attributes["has_disability"] ? implode(' ', fake()->words()) : null;
            },
            "seen" => fake()->boolean(),
            "parent_name" => fake()->name(),
            "parent_phone_number" => fake()->numerify('##########'),
            "parenting_job" => implode(' ', fake()->words(2)),
            "created_at" => fake()->date(),
            "updated_at" => fake()->date(),
        ];
    }
}
