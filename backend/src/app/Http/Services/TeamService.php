<?php

namespace App\Http\Services;

use App\Models\Team;
use Illuminate\Support\Facades\DB;
use App\Http\Misc\Helpers\ProccessStrings;

class TeamService
{
  /*
   * any user can show all teams
   *
   * @return Collection
   */
  public function getAllTeams()
  {
    $teams = Team::all();
    if (!$teams) {
      return null;
    }
    return $teams;
  }

  /**
   * for managers (role = 1) only to create a team
   * @param Team $team
   * @return bool
   */
  public function addTeam(string $team_name): ?Team
  {
    if (!$team_name) {
      return null;
    }
    $team_name = ProccessStrings::trim_replace_lower($team_name);
    try {
      DB::beginTransaction();
      $team = Team::create([
        'team_name' => $team_name,
      ]);
      DB::commit();
    } catch (\Illuminate\Database\QueryException $ex) {
      DB::rollback();
      return null;
    }
    return $team;
  }

  /**
   * for managers (role = 1) only to delete a team
   * @param string $team_name
   * @return bool
   */
  public function deleteTeam(string $team_name): bool
  {
    if (!$team_name) {
      return false;
    }
    $team_name = ProccessStrings::trim_replace_lower($team_name);
    try {
      DB::beginTransaction();
      $team = Team::where('team_name', $team_name)->first();
      $team->delete();
      DB::commit();
    } catch (\Illuminate\Database\QueryException $ex) {
      DB::rollback();
      return false;
    }
    return true;
  }
}
