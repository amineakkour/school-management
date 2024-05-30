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
            // $table->string('name');
            // $table->string('phone_number', 10);
            // $table->string('title', 50);
            // $table->string('message', 250);
            "name" => fake()->name,
            "phone_number" => fake()->numerify("########"),
            "title" => implode(' ', fake()->words(3)),
            "message" => fake()->paragraph(),
        ];
    }
}
