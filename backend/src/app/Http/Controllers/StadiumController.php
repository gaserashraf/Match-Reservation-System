<?php

namespace App\Http\Controllers;

use App\Http\Services\StadiumService;
use App\Http\Requests\StadiumCreationRequest;
use App\Http\Requests\StadiumDeletionRequest;
use App\Http\Resources\StadiumResource;

class StadiumController extends Controller
{
  /*
   * only managers (role = 1) can add a new stadium to the database.
   *
   * @param StadiumCreationRequest $request
   * @return Json
   */
  public function createStadium(StadiumCreationRequest $request)
  {
    $stadiumService = new StadiumService();
    $stadium = $stadiumService->createStadium(
      $request->stadium_name,
      $request->number_of_rows,
      $request->number_of_seats_per_row
    );
    if (!$stadium) {
      return $this->errorResponse('Stadium Creation Failed.', 400);
    }
    $stadiumResource = new StadiumResource($stadium);
    return $this->generalResponse($stadiumResource, 'Stadium Created Successfully.', 200);
  }

  /*
   * only managers (role = 1) can delete a stadium from the database.
   *
   * @param StadiumDeletionRequest $request
   * @return Json
   */
  public function deleteStadium(StadiumDeletionRequest $request)
  {
    $stadiumService = new StadiumService();
    $stadium = $stadiumService->deleteStadium($request->stadium_name);
    if (!$stadium) {
      return $this->errorResponse('Stadium Deletion Failed.', 400);
    }
    $stadiumResource = new StadiumResource($stadium);
    return $this->generalResponse($stadiumResource, 'Stadium Deleted Successfully.', 200);
  }
}
