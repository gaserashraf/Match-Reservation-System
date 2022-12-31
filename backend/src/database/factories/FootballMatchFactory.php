<?php

namespace Database\Factories;

use App\Models\Team;
use App\Models\Referee;
use App\Models\Stadium;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\FootballMatch>
 */
class FootballMatchFactory extends Factory
{
  /**
   * Define the model's default state.
   *
   * @return array<string, mixed>
   */
  public function definition()
  {
    // 2 not equal team ids, since a team can't play against itself :)
    $teamA_id = $this->faker->randomElement(Team::all()->pluck('id')->toArray());
    $teamB_id = $this->faker->randomElement(Team::all()->pluck('id')->toArray());
    while ($teamA_id === $teamB_id) {
      $teamB_id = $this->faker->randomElement(Team::all()->pluck('id')->toArray());
    }

    // 1 referee id
    $referee_id = $this->faker->randomElement(Referee::all()->pluck('id')->toArray());

    // 2 not equal linesman ids and they can't be the same as referee id
    $linesmanA_id = $this->faker->randomElement(Referee::all()->pluck('id')->toArray());
    while ($linesmanA_id === $referee_id) {
      $linesmanA_id = $this->faker->randomElement(Referee::all()->pluck('id')->toArray());
    }
    $linesmanB_id = $this->faker->randomElement(Referee::all()->pluck('id')->toArray());
    while ($linesmanB_id === $referee_id || $linesmanB_id === $linesmanA_id) {
      $linesmanB_id = $this->faker->randomElement(Referee::all()->pluck('id')->toArray());
    }

    // 1 stadium id
    $stadium_id = $this->faker->randomElement(Stadium::all()->pluck('id')->toArray());

    return [
      'teamA_id' => $teamA_id,
      'teamB_id' => $teamB_id,
      'stadium_id' => $stadium_id,
      'referee_id' => $referee_id,
      'linesmanA_id' => $linesmanA_id,
      'linesmanB_id' => $linesmanB_id,
      'score' => null,
      'date' => $this->faker->date(),
      'time' => $this->faker->time(),
    ];
  }
}
