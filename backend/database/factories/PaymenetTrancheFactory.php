<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PaymenetTranche>
 */
class PaymenetTrancheFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'payment_method' => $this->faker->randomElement(["check", "transfer", "cash", "card", "terminal"]),
            'verified_at' => $this->faker->optional()->dateTime(),
            'registration_id' => null,
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
