<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

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
    try {
      User::factory()->count(1)->create([
        'role' => 0,
        'allowed' => 1,
        'email' => env("TEMP_ADMIN_EMAI"),
        'password' => Hash::make(env("TEMP_ADMIN_PASS")),
        'email_verified_at' => now(),
      ]);
    } catch (\Exception $e) {
    }
    User::factory()->count(2)->create([
      'role' => 0,
      'allowed' => 1,
      'email_verified_at' => now(),
    ]);


    User::factory()->count(2)->create();
  }
}
