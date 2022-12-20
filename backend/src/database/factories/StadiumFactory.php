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

    $football_stadium = $this->faker->randomElement([
      'Anfield',
      'Camp Nou',
      'Emirates Stadium',
      'Estadio Santiago Bernabéu',
      'Etihad Stadium',
      'Old Trafford',
      'Parc des Princes',
      'Signal Iduna Park',
      'Stadio Olimpico',
      'Stamford Bridge',
      'Wembley Stadium',
      'Allianz Arena',
      'San Siro',
      'Veltins-Arena',
      'Volkswagen Arena',
      'Volksparkstadion',
    ]);

    return [
      'stadium_name' => $football_stadium,
      'number_of_rows' => $this->faker->numberBetween(10, 20),
      'number_of_seats_per_row' => $this->faker->numberBetween(1000, 2000),
    ];
  }
}
