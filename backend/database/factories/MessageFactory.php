<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Message>
 */
class MessageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "name" => fake()->name,
            "phone_number" => fake()->numerify("########"),
            "title" => implode(' ', fake()->words(3)),
            "message" => fake()->paragraph(1),
            "seen_at" => fake()->optional()->dateTime(),
        ];
    }
}
