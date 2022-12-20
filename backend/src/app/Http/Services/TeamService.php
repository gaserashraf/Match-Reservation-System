<?php

namespace App\Http\Services;

use App\Models\Team;
use Illuminate\Support\Facades\DB;

class TeamService
{
  /**
   * for managers (role = 1) only to create a team
   * @param Team $team
   * @return bool
   */
  public function createTeam(string $team_name): ?Team
  {
    if (!$team_name) {
      return null;
    }
    DB::beginTransaction();
    try {
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
    DB::beginTransaction();
    try {
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