<?php

namespace App\Http\Controllers;

use App\Http\Services\FootballMatchService;

use App\Http\Requests\FootballMatchUpdateRequest;
use App\Http\Requests\FootballMatchCreationRequest;
use App\Http\Requests\FootballMatchDeletionRequest;
use App\Http\Requests\FootballMatchViewRequest;

use App\Http\Resources\FootballMatchResource;
use App\Http\Resources\FootballMatchCollection;


class FootballMatchController extends Controller
{

  /**
   * any user can view all matches or
   * a subset of them by passing query parameters
   *
   * @param FootballMatchViewRequest $request
   * @return Json
   */
  public function viewMatches(FootballMatchViewRequest $request)
  {
    $request->validated();
    $result = (new FootballMatchService())->viewMatchs(
      $request->match_id,
      $request->team_id,
      $request->stadium_id,
      $request->referee_id,
      $request->date_at,
      $request->date_from,
      $request->date_to
    );
    if (!$result === null) {
      return $this->errorResponse('Forbidden', 403);
    }
    // $result = $result->paginate(10);
    return $this->generalResponse(new FootballMatchCollection($result), "ok", 200);
  }

  /**
   * only managers (role = 1) can create new matches
   *
   * @param FootballMatchRequest $request
   * @return Json
   */
  public function addMatch(FootballMatchCreationRequest $request)
  {
    $request->validated();
    $footballMatchService = new FootballMatchService();

    $teamA_id = $request->teamA_id;
    $teamB_id = $request->teamB_id;
    $stadium_id = $request->stadium_id;
    $referee_id = $request->referee_id;
    $linsmanA_id = $request->linsmanA_id;
    $linsmanB_id = $request->linsmanB_id;
    $date = $request->date;
    $time = $request->time;
    $score = $request->score;

    $footballMatch = $footballMatchService->addMatch(
      $teamA_id,
      $teamB_id,
      $stadium_id,
      $referee_id,
      $linsmanA_id,
      $linsmanB_id,
      $date,
      $time,
      $score
    );

    if (!$footballMatch) {
      return $this->errorResponse('Error creating match', 500);
    }

    $FootballMatchResource = new FootballMatchResource($footballMatch);
    return $this->generalResponse($FootballMatchResource, "ok", 201);
  }

  /**
   * only managers (role = 1) can update matches
   *
   * @param FootballMatchUpdateRequest $request
   * @return Json
   */
  public function updateMatch(FootballMatchUpdateRequest $request)
  {
    $request->validated();
    $footballMatchService = new FootballMatchService();

    $match_id = $request->match_id;
    $teamA_id = $request->teamA_id;
    $teamB_id = $request->teamB_id;
    $stadium_id = $request->stadium_id;
    $referee_id = $request->referee_id;
    $linsmanA_id = $request->linsmanA_id;
    $linsmanB_id = $request->linsmanB_id;
    $date = $request->date;
    $time = $request->time;
    $score = $request->score;

    $footballMatch = $footballMatchService->updateMatch(
      $match_id,
      $teamA_id,
      $teamB_id,
      $stadium_id,
      $referee_id,
      $linsmanA_id,
      $linsmanB_id,
      $date,
      $time,
      $score
    );

    if (!$footballMatch) {
      return $this->errorResponse('Error updating match', 500);
    }

    $FootballMatchResource = new FootballMatchResource($footballMatch);
    return $this->generalResponse($FootballMatchResource, "ok", 200);
  }

  /**
   * only managers (role = 1) can delete matches
   *
   * @param FootballMatchDeletionRequest $request
   * @return Json
   */
  public function deleteMatch(FootballMatchDeletionRequest $request)
  {
    $request->validated();
    $footballMatchService = new FootballMatchService();
    $match_id = $request->match_id;
    $footballMatch = $footballMatchService->deleteMatch($match_id);
    if (!$footballMatch) {
      return $this->errorResponse('Error deleting match', 500);
    }
    $FootballMatchResource = new FootballMatchResource($footballMatch);
    return $this->generalResponse($FootballMatchResource, "ok", 200);
  }
}
