<?php

namespace App\Http\Controllers;

// Helpers
use App\Http\Misc\Helpers\Errors;
use App\Http\Misc\Helpers\Success;

// Services
use App\Http\Services\UserService;

// Requests
use Illuminate\Http\Request;
use App\Http\Requests\UserRegisterRequest;
use App\Http\Requests\UserLoginRequest;

// Resources
use App\Http\Resources\UserResource;

// Controller
class UserController extends Controller
{
  /**
   * Create a new user
   * @param UserRegisterRequest $request
   * @return Json
   */
  public function register(UserRegisterRequest $request)
  {
    $userService = new UserService();
    $user = $userService->register(
      $request->first_name,
      $request->last_name,
      $request->birth_date,
      $request->gender,
      $request->nationality,
      $request->role,
      $request->username,
      $request->email,
      $request->password,
    );
    if (!$user) {
      return $this->errorResponse('not found', '404');
    }
    $userResource = new UserResource($user);
    return $this->generalResponse($userResource, Success::STILL_NOT_ALLOWED, "200");
  }

  /**
   * login a user
   * @param UserLoginRequest $request
   * @return Json
   */
  public function login(UserLoginRequest $request)
  {
    $userService = new UserService();
    $user = $userService->checkLoginCredentials($request->email, $request->password);
    if (!$user) {
      return $this->errorResponse(Errors::INCORRECT_EMAIL_PASSWORD, '422');
    }
    if (!$user->allowed) {
    return $this->generalResponse("", Success::STILL_NOT_ALLOWED, "200");
    }
    $userService->grantAccessToken($user);
    $userResource = new UserResource($user);
    return $this->generalResponse($userResource, "Successful response", '200');
  }

  /**
   * logout a specific user device (delete a specific token not all user tokrns)
   * @param Request $request
   * @return Json
   */
  public function logout(Request $request)
  {
    if ($request->user() && $request->user()->token()) {
      $request->user()->token()->delete();
      return $this->generalResponse('', "Successful response", '200');
    }
    return $this->errorResponse('not found', '404');
  }
}
