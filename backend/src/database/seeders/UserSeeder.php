<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    // create 3 verified admin users
    User::factory()->count(3)->create([
      'role' => 0,
      'allowed' => 1,
      'email_verified_at' => now(),
    ]);

    User::factory()->count(10)->create();
  }
}
