<?php

namespace App\Http\Controllers;

// Models
use App\Models\User;

// Services
use App\Http\Services\AdminService;

// Helpers
use App\Http\Misc\Helpers\Errors;


// Requests
use Illuminate\Http\Request;
use App\Http\Requests\AllowUserRequest;

class AdminController extends Controller
{
  /**
   * Allow user to login
   *
   * @param  string  $username
   * @return Json
   */
  public function allowUser(Request $AllowUserRequest)
  {
    $username = $AllowUserRequest->username;
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
  public function deleteUser(Request $AllowUserRequest)
  {
    $username = $AllowUserRequest->username;
    $adminService = new AdminService();
    if ($adminService->deleteUser($username)) {
      return $this->generalResponse('User [' . $username . '] has been deleted successfully!', "Successful response", '200');
    } else {
      return $this->errorResponse("Failed response", '400');
    }
  }
}
