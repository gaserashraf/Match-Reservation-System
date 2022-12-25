<?php

namespace App\Http\Controllers;

use App\Http\Requests\StadiumReservedSeetsRequest;
use App\Http\Services\StadiumService;

use App\Http\Requests\StadiumCreationRequest;
use App\Http\Requests\StadiumDeletionRequest;

use App\Http\Resources\StadiumResource;
use App\Http\Resources\StadiumCollection;

class StadiumController extends Controller
{
  /**
   * any user can show all stadiums
   *
   * @return Json
   */
  public function getAllStadiums()
  {
    $stadiums = (new StadiumService())->getAllStadiums();
    if (!$stadiums) {
      return $this->errorResponse('Forbidden', 403);
    }
    // $stadiums = $stadiums->paginate(10);
    return $this->generalResponse(new StadiumCollection($stadiums), "ok", 200);
  }

  /**
   * any user can show all reserved seats for a match
   *
   * @param StadiumReservedSeetsRequest $request
   * @return Json
   */
  public function getReservedSeats(StadiumReservedSeetsRequest $request)
  {
    $request->validated();
    $stadium_name = $request->stadium_name;
    $match_id = $request->match_id;
    $reserved_seats = (new StadiumService())->getReservedSeats($stadium_name, $match_id);
    if (!$reserved_seats) {
      return $this->errorResponse('Forbidden', 403);
    }
    return $this->generalResponse($reserved_seats, "ok", 200);
  }

  /*
   * only managers (role = 1) can add a new stadium to the database.
   *
   * @param StadiumCreationRequest $request
   * @return Json
   */
  public function addStadium(StadiumCreationRequest $request)
  {
    $request->validated();
    $stadiumService = new StadiumService();
    $stadium = $stadiumService->addStadium(
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
    $request->validated();
    $stadiumService = new StadiumService();
    $stadium = $stadiumService->deleteStadium($request->stadium_name);
    if (!$stadium) {
      return $this->errorResponse('Stadium Deletion Failed.', 400);
    }
    $stadiumResource = new StadiumResource($stadium);
    return $this->generalResponse($stadiumResource, 'Stadium Deleted Successfully.', 200);
  }
}
