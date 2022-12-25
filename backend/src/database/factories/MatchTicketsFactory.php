<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\FootballMatch;
use App\Models\MatchTickets;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\MatchTickets>
 */
class MatchTicketsFactory extends Factory
{
  /**
   * Define the model's default state.
   *
   * @return array<string, mixed>
   */
  public function definition()
  {

    $match_id = $this->faker->randomElement(FootballMatch::all()->pluck('id')->toArray());
    $user_id = $this->faker->randomElement(User::where('role', 2)->get()->pluck('id')->toArray());

    // keep trying if the combination of match_id and user_id already exists
    while (MatchTickets::where('match_id', $match_id)->where('user_id', $user_id)->exists()) {
      $user_id = $this->faker->randomElement(User::where('role', 2)->get()->pluck('id')->toArray());
    }

    $stadium = FootballMatch::find($match_id)->stadium()->first();
    $row = $this->faker->numberBetween(0, $stadium->number_of_rows - 1);
    $seat = $this->faker->numberBetween(0, $stadium->number_of_seats_per_row - 1);

    return [
      'match_id' => $match_id,
      'user_id' => $user_id,
      'row_number' => $row,
      'seat_number' => $seat,
    ];
  }
}
