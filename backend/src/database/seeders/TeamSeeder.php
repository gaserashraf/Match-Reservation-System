<?php

namespace Database\Seeders;

use App\Models\Team;
use Illuminate\Database\Seeder;

class TeamSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    Team::factory()->count(10)->create();

    // insert those following teams as a start
    $teams = [
      "Qatar", "Ecuador", "Senegal", "Netherlands",
      "England", "Iran", "USA", "Wales",
      "Argentina", "Saudi Arabia", "Mexico", "Poland",
      "France", "Australia", "Denmark", "Tunisia",
      "Spain", "Costa Rica", "Germany", "Japan",
      "Belgium", "Canada", "Morocco", "Croatia",
      "Brazil", "Serbia", "Switzerland", "Cameroon",
      "Portugal", "Ghana", "Uruguay", "South Korea",
    ];
    foreach ($teams as $team) {
      Team::create([
        'team_name' => $team,
      ]);
    }
  }
}
