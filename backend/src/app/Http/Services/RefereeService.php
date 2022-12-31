<?php

namespace App\Http\Services;

use App\Models\Referee;
use Illuminate\Support\Facades\DB;

class RefereeService
{
  /**
   * any user can show all referees
   *
   * @return Collection | null
   */
  public function getAllReferees()
  {
    $referees = Referee::all();
    if (!$referees) {
      return null;
    }
    return $referees;
  }

  /** only managers (role = 1) can add new referee
   *
   * @param string $referee_name
   * @param string $referee_email
   * @return Referee|null
   */
  public function addReferee(string $referee_name, string $referee_email): ?Referee
  {
    DB::beginTransaction();
    try {
      $referee = Referee::create([
        'referee_name' => $referee_name,
        'referee_email' => $referee_email,
      ]);
      DB::commit();
      return $referee;
    } catch (\Illuminate\Database\QueryException $ex) {
      DB::rollback();
      return null;
    }
  }


  /** only managers (role = 1) can delete referee
   *
   * @param int $referee_id
   * @return bool
   */
  public function deleteReferee(int $referee_id): ?Referee
  {
    if(!$referee_id) {
      return null;
    }
    try {
      $referee = Referee::find($referee_id);
      $referee->delete();
      return $referee;
    } catch (\Illuminate\Database\QueryException $ex) {
      return null;
    }
  }
}
