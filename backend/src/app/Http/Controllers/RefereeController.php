<?php

namespace App\Http\Controllers;

use App\Http\Requests\RefereeCreationRequest;
use App\Http\Requests\RefereeDeletionRequest;
use App\Http\Resources\RefereeResource;
use App\Http\Services\RefereeService;


class RefereeController extends Controller
{
  /*
   * only managers (role = 1) can add new referee
   *
   * @param RefereeCreateRequest $request
   * @param Json
   */
  public function addReferee(RefereeCreationRequest $request)
  {
    $refereeService = new RefereeService();
    $referee = $refereeService->addReferee($request->referee_name, $request->referee_email);
    if (!$referee) {
      return $this->errorResponse('Failed to add referee', 500);
    }
    $refereeResource = new RefereeResource($referee);
    return $this->generalResponse($refereeResource, 'Referee added Successfully', 201);
  }

  /*
   * only managers (role = 1) can delete referee
   *
   * @param RefereDeletionRequest $request
   * @param Json
   */
  public function deleteReferee(RefereeDeletionRequest $request)
  {
    $refereeService = new RefereeService();
    $referee = $refereeService->deleteReferee($request->referee_id);
    if (!$referee) {
      return $this->errorResponse('Failed to delete referee', 500);
    }
    $refereeResource = new RefereeResource($referee);
    return $this->generalResponse($refereeResource, 'Referee deleted Successfully', 200);
  }
}
