<?php

namespace App\Http\Controllers;

// Services
use App\Http\Resources\UserCollection;
use App\Http\Services\AdminService;

// Requests
use App\Http\Requests\AllowUserRequest;

class AdminController extends Controller
{

  /**
   * for admins (role = 0) only, get all new users except any admins
   * they're yet to be allowed (to allow/add)
   *
   * @return Json
   */
  public function getNewUsers() 
  {
    $adminService = new AdminService();
    $users = $adminService->getUsers(false);
    if (!$users) {
      return $this->errorResponse('Forbidden', 403);
    }
    // $users = $users->paginate(10);
    return $this->generalResponse(new UserCollection($users), "ok", 200);
  }

  /**
   * for admins (role = 0) only, get all current users except any admins
   * they're currently be allowed (to edit/delete)
   *
   * @return Json
   */
  public function getCurrentUsers() 
  {
    $adminService = new AdminService();
    $users = $adminService->getUsers(true);
    if (!$users) {
      return $this->errorResponse('Forbidden', 403);
    }
    // $users = $users->paginate(10);
    return $this->generalResponse(new UserCollection($users), "ok", 200);
  }

  /**
   * Allow user to login
   *
   * @param  string  $username
   * @return Json
   */
  public function allowUser(AllowUserRequest $request)
  {
    $request->validated();
    $username = $request->username;
    $adminService = new AdminService();
    if ($adminService->allowUser($username, true)) {
      return $this->generalResponse('User [' . $username . '] has been allowed successfully!', "Successful response", '200');
    } else {
      return $this->errorResponse("Failed response", '400');
    }
  }

  /**
   * Delete a user
   *
   * @param  string  $username
   * @return Json
   */
  public function deleteUser(AllowUserRequest $request)
  {
    $request->validated();
    $username = $request->username;
    $adminService = new AdminService();
    if ($adminService->deleteUser($username)) {
      return $this->generalResponse('User [' . $username . '] has been deleted successfully!', "Successful response", '200');
    } else {
      return $this->errorResponse("Failed response", '400');
    }
  }
}
