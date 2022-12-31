<?php

namespace App\Http\Services;

use App\Models\User;

class AdminService
{

  /**
   * for admins (role = 0) only, get all users except any admins
   * allowed = true => means get current users (to edit/delete)
   * allowed = false => means get new users (to add)
   *
   * @param bool $allowed
   * @return ?Collection
   */
  public function getUsers(bool $allowed = false)
  {
    return User::where('role', '!=', 0)->where('allowed', $allowed)->get();
  }

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
    $user->allowed = $allow;
    $user->save();
    return true;
  }


  /**
   * for admins (role = 0) only to delete a user
   * @param User $user
   * @return bool
   */
  public function deleteUser(string $username): bool
  {
    if (!$username) {
      return false;
    }
    $user = User::where('username', $username)->first();
    if (!$user) {
      return false;
    }
    $user->delete();
    return true;
  }
}
