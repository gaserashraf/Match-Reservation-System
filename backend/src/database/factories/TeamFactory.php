<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Team>
 */
class TeamFactory extends Factory
{
  /**
   * Define the model's default state.
   *
   * @return array<string, mixed>
   */
  public function definition()
  {
    $football_teams = $this->faker->randomElement([
      'Arsenal',
      'Chelsea',
      'Liverpool',
      'Manchester-City',
      'Manchester-United',
      'Tottenham-Hotspur',
      'Everton',
      'Sheffield-United',
      'Burnley',
      'Southampton',
      'Newcastle-United',
      'Brighton-and-Hove-Albion',
      'Fulham',
      'West-Bromwich-Albion',
    ]);
    return [
      'team_name' => $football_teams,
    ];
  }
}
