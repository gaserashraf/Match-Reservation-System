<?php

namespace App\Http\Controllers;

use App\Http\Services\RefereeService;

use App\Http\Requests\RefereeCreationRequest;
use App\Http\Requests\RefereeDeletionRequest;

use App\Http\Resources\RefereeResource;
use App\Http\Resources\RefereeCollection;


class RefereeController extends Controller
{

  /** 
   * any user can show all referees
   *
   * @return Json
   */
  public function getAllReferees()
  {
    $referees = (new RefereeService())->getAllReferees();
    if (!$referees) {
      return $this->errorResponse('Forbidden', 403);
    }
    // $referees = $referees->paginate(10);
    return $this->generalResponse(new RefereeCollection($referees), "ok", 200);
  }

  /*
   * only managers (role = 1) can add new referee
   *
   * @param RefereeCreateRequest $request
   * @return Json
   */
  public function addReferee(RefereeCreationRequest $request)
  {
    $request->validated();
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
   * @return Json
   */
  public function deleteReferee(RefereeDeletionRequest $request)
  {
    $request->validated();
    $refereeService = new RefereeService();
    $referee = $refereeService->deleteReferee($request->referee_id);
    if (!$referee) {
      return $this->errorResponse('Failed to delete referee', 500);
    }
    $refereeResource = new RefereeResource($referee);
    return $this->generalResponse($refereeResource, 'Referee deleted Successfully', 200);
  }
}
