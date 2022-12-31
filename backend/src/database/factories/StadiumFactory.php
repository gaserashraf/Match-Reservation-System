<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Stadium>
 */
class StadiumFactory extends Factory
{
  /**
   * Define the model's default state.
   *
   * @return array<string, mixed>
   */
  public function definition()
  {

    return [
      'stadium_name' => $this->faker->unique()->word,
      'number_of_rows' => $this->faker->numberBetween(10, 20),
      'number_of_seats_per_row' => $this->faker->numberBetween(1000, 2000),
    ];
  }
}
