<?php

namespace Database\Seeders;

use App\Models\MatchTickets;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MatchTicketsSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    MatchTickets::factory()->count(50)->create();
  }
}
