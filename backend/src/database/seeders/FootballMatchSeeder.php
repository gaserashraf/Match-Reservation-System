<?php

namespace Database\Seeders;

use App\Models\FootballMatch;
use Illuminate\Database\Seeder;

class FootballMatchSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    FootballMatch::factory()->count(3)->create();
  }
}
