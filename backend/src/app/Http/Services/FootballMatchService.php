<?php

namespace App\Http\Services;

use App\Models\FootballMatch;
use Illuminate\Support\Facades\DB;

class FootballMatchService
{

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

}
