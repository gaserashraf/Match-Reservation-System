<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
  /**
   * Seed the application's database.
   *
   * @return void
   */
  public function run(): void
  {
    $this->call(UserSeeder::class);
    $this->call(TeamSeeder::class);
    $this->call(StadiumSeeder::class);
    $this->call(RefereeSeeder::class);
    $this->call(FootballMatchSeeder::class);
  }
}
