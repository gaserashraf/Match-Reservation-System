<?php

namespace App\Http\Services;

use App\Models\FootballMatch;
use Illuminate\Support\Facades\DB;

class FootballMatchService
{
  /**
   * any user can view all matches or 
   * a subset of them by passing query parameters
   *
   * @param ?int $match_id
   * @param ?int $team_id
   * @param ?int $stadium_id
   * @param ?int $referee_id
   * @param string $date_at
   * @param string $date_from
   * @param string $date_to
   *
   * @return Collection
   */
  public function viewMatchs(
    ?int $match_id,
    ?int $team_id,
    ?int $stadium_id,
    ?int $referee_id,
    ?string $date_at,
    ?string $date_from,
    ?string $date_to
  ) {
    // it's either date_at or a range (date_from and date_to)
    if ($date_at !== null && $date_from !== null && $date_to !== null) {
      return null;
    }
    $result = FootballMatch::all();
    if ($match_id !== null) {
      $result = $result->where('id', $match_id);
    }
    if ($team_id !== null) {
      $result = $result->where('teamA_id', $team_id)->orWhere('teamB_id', $team_id);
    }
    if ($stadium_id !== null) {
      $result = $result->where('stadium_id', $stadium_id);
    }
    if ($referee_id !== null) {
      $result = $result->where('referee_id', $referee_id);
    }
    if ($date_at !== null) {
      $result = $result->where('date', $date_at);
    }
    if ($date_from !== null && $date_to !== null) {
      $result = $result->whereBetween('date', [$date_from, $date_to]);
    }
    return $result;
  }

  /*
   * only manager (role = 1) can create a match
   *
   * @param int $teamA_id
   * @param int $teamB_id
   * @param int $stadium_id
   * @param int $referee_id
   * @param int $linesmanA_id
   * @param int $linesmanB_id
   * @param string $date
   * @param string $time
   * @param string|null $score
   *
   * @return FootballMatch | null
   */
  public function addMatch(
    int $teamA_id,
    int $teamB_id,
    int $stadium_id,
    int $referee_id,
    int $linesmanA_id,
    int $linesmanB_id,
    string $date,
    string $time = '21:00',
    ?string $score = null
  ): ?FootballMatch {
    try {
      DB::beginTransaction();
      $match = FootballMatch::create([
        'teamA_id' => $teamA_id,
        'teamB_id' => $teamB_id,
        'stadium_id' => $stadium_id,
        'referee_id' => $referee_id,
        'linesmanA_id' => $linesmanA_id,
        'linesmanB_id' => $linesmanB_id,
        'date' => $date,
        'time' => $time,
        'score' => $score,
      ]);
      DB::commit();
      return $match;
    } catch (\Illuminate\Database\QueryException $ex) {
      DB::rollback();
      return null;
    }
  }

  /**
   * only manager (role = 1) can update a match
   * update match only if the given value is not null
   * if the value is null, it means that the user didn't want to update it
   *
   * @param ?int $match_id
   * @param ?int $teamA_id
   * @param ?int $teamB_id
   * @param ?int $stadium_id
   * @param ?int $referee_id
   * @param ?int $linesmanA_id
   * @param ?int $linesmanB_id
   * @param string $date
   * @param string $time
   * @param string|null $score
   *
   * @return FootballMatch | null
   */
  public function updateMatch(
    int $match_id,
    ?int $teamA_id,
    ?int $teamB_id,
    ?int $stadium_id,
    ?int $referee_id,
    ?int $linesmanA_id,
    ?int $linesmanB_id,
    ?string $date,
    ?string $time = '21:00',
    ?string $score = null
  ): ?FootballMatch {
    $match = FootballMatch::find($match_id)->first();
    if (!$match) {
      return null;
    }
    try {
      DB::beginTransaction();
      $match->teamA_id = $teamA_id ?? $match->teamA_id;
      $match->teamB_id = $teamB_id ?? $match->teamB_id;
      $match->stadium_id = $stadium_id ?? $match->stadium_id;
      $match->referee_id = $referee_id ?? $match->referee_id;
      $match->linesmanA_id = $linesmanA_id ?? $match->linesmanA_id;
      $match->linesmanB_id = $linesmanB_id ?? $match->linesmanB_id;
      $match->date = $date ?? $match->date;
      $match->time = $time ?? $match->time;
      $match->score = $score ?? $match->score;
      $match->save();
      DB::commit();
      return $match;
    } catch (\Illuminate\Database\QueryException $ex) {
      DB::rollback();
      return null;
    }
  }

  /**
   * only manager (role = 1) can delete a match
   *
   * @param int $match_id
   * @return ?FootballMatch
   */
  public function deleteMatch(int $match_id): ?FootballMatch
  {
    $match = FootballMatch::find($match_id)->first();
    if (!$match) {
      return null;
    }
    try {
      DB::beginTransaction();
      $match->delete();
      DB::commit();
      return $match;
    } catch (\Illuminate\Database\QueryException $ex) {
      DB::rollback();
      return null;
    }
  }
}
