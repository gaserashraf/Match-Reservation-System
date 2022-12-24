<?php

namespace App\Http\Controllers;

use App\Http\Services\FootballMatchService;

use App\Http\Requests\FootballMatchCreationRequest;

use App\Http\Resources\FootballMatchResource;
class FootballMatchController extends Controller
{

  /**
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
