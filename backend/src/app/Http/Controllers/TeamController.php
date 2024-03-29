<?php

namespace App\Http\Controllers;

use App\Http\Services\TeamService;

use App\Http\Requests\TeamCreationRequest;
use App\Http\Requests\TeamDeletionRequest;

use App\Http\Resources\TeamResource;
use App\Http\Resources\TeamCollection;

class TeamController extends Controller
{
  /*
   * any user can show all teams
   *
   * @return Json
   */
  public function getAllTeams()
  {
    $teams = (new TeamService())->getAllTeams();
    if (!$teams) {
      return $this->errorResponse('Forbidden', 403);
    }
    // $teams = $teams->paginate(10);
    return $this->generalResponse(new TeamCollection($teams), "ok", 200);
  }

  /*
   * only managers (role == 1) can create new teams
   *
   * @param TeamCreationRequest $request
   * @return Json
   */
  public function addTeam(TeamCreationRequest $request)
  {
    $request->validated();
    $team_name = $request->input('team_name');
    $team = (new TeamService())->addTeam($team_name);
    if (!$team) {
      return $this->errorResponse('Team creation failed', 400);
    }
    $teamResource = new TeamResource($team);
    return $this->generalResponse($teamResource, 'Team created successfully', 201);
  }

  /*
   * only managers (role == 1) can delete teams
   *
   * @param TeamDeletionRequest $request
   * @return Json
   */
  public function deleteTeam(TeamDeletionRequest $request)
  {
    $request->validated();
    $team_name = $request->input('team_name');
    $team = (new TeamService())->deleteTeam($team_name);
    if (!$team) {
      return $this->errorResponse('Team deletion failed', 400);
    }
    $teamResource = new TeamResource($team);
    return $this->generalResponse($teamResource, 'Team deleted successfully', 200);
  }
}
