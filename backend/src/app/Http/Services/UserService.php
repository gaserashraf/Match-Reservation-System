<?php

namespace App\Http\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Events\Verified;
use Illuminate\Support\Facades\DB;

class UserService
{
  /**
   * Create a new user
   * @param string $email
   * @param string $password
   * @param string $first_name
   * @param string $last_name
   * @param string $birth_date
   * @param bool $gender
   * @param string $nationality
   * @param int $role
   * @param string $username
   * @return User
   */
  public function register(
    string $first_name,
    string $last_name,
    string $birth_date,
    bool $gender,
    string $nationality,
    int $role,
    string $username,
    string $email,
    string $password
  ): ?User {
    DB::beginTransaction();
    try {
      $user = User::create([
        'first_name' => $first_name,
        'last_name' => $last_name,
        'birth_date' => $birth_date,
        'gender' => $gender,
        'nationality' => $nationality,
        'role' => $role,
        'username' => $username,
        'email' => $email,
        'password' => Hash::make($password),
      ]);
      DB::commit();
    } catch (\Illuminate\Database\QueryException $ex) {
      DB::rollback();
      return null;
    }
    event(new Registered($user));
    return $user;
  }

  /**
   * check the login credentials
   * @param string $email
   * @param string $password
   * @return User
   */
  public function checkLoginCredentials(string $email, string $password): ?User
  {
    $user = User::where('email', $email)->first();
    if (!$user || !Hash::check($password, $user->password)) {
      $user = null;
    }
    return $user;
  }

  /**
   * grant access_token for a user
   * @param User $user
   * @return bool
   */
  public function grantAccessToken(User $user): bool
  {
    if (!$user) {
      return false;
    }
    $token = $user->createToken('Auth Token')->accessToken;
    $user->withAccessToken($token);
    return true;
  }

  /**
   * either verify email or resend verification mail for an unverified user
   * @param User $user
   * @param bool $resend
   * @return bool
   */
  public function verifyUserEmail(User $user, bool $resend): bool
  {
    if (!$user) {
      return false;
    }
    if (!$user->hasVerifiedEmail()) {
      if ($resend) {
        $user->sendEmailVerificationNotification();
        return true;
      }
      $user->markEmailAsVerified();
      event(new Verified($user));
      return true;
    }
    return false;
  }

}
