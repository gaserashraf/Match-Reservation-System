<?php

namespace App\Http\Services;

use App\Models\User;
use Illuminate\Support\Facades\Auth;

class AdminService
{
  /**
   * for admins (role = 0) only to allow or disallow a user
   * @param User $user
   * @param bool $allow
   * @return bool
   */
  public function allowUser(string $username, bool $allow): bool
  {
    if (!$username) {
      return false;
    }
    $user = User::where('username', $username)->first();
    if (!$user) {
      return false;
    }
    if (Auth::user()->role === 0) {
      $user->allowed = $allow;
      $user->save();
      return true;
    }
    return false;
  }
}
