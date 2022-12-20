<?php

namespace App\Http\Controllers;

use App\Http\Services\TeamService;
use App\Http\Requests\TeamCreationRequest;
use App\Http\Requests\TeamDeletionRequest;
use App\Http\Resources\TeamResource;

class TeamController extends Controller
{
  /*
   * only managers (role == 1) can create new teams
   *
   * @param TeamCreationRequest $request
   * @return Json
   */
  public function createTeam(TeamCreationRequest $request)
  {
    $team_name = $request->input('team_name');
    $team_name = trim($team_name)->replace(' ', '-');
    $team = (new TeamService())->createTeam($team_name);
    if (!$team) {
      return $this->errorResponse('Team creation failed', 400);
    }
    $team_resource = new TeamResource($team);
    return $this->generalResponse($team_resource, 'Team created successfully', 201);
  }

  /*
   * only managers (role == 1) can delete teams
   *
   * @param TeamDeletionRequest $request
   * @return Json
   */
  public function deleteTeam(TeamDeletionRequest $request)
  {
    $team_name = $request->input('team_name');
    $team_name = trim($team_name)->replace(' ', '-');
    $team = (new TeamService())->deleteTeam($team_name);
    if (!$team) {
      return $this->errorResponse('Team deletion failed', 400);
    }
    $team_resource = new TeamResource($team);
    return $this->generalResponse($team_resource, 'Team deleted successfully', 200);
  }
}
