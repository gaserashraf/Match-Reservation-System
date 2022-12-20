<?php

namespace App\Http\Services;

use App\Models\Stadium;
use Illuminate\Support\Facades\DB;
use App\Http\Misc\Helpers\ProccessStrings;

class StadiumService
{

  /**
   * only managers (role = 1) can add a new stadium to the database.
   *
   * @param string $stadium_name
   * @param string $stadium_shape
   * @param string $stadium_max_capacity
   * @return Stadium
   */
  public function createStadium(string $stadium_name, int $number_of_rows, int $number_of_seats_per_row): ?Stadium
  {
    if (!$stadium_name || !$stadium_shape || !$stadium_max_capacity) {
      return null;
    }
    $stadium_name = ProccessStrings::trim_replace_lower($stadium_name);
    DB::beginTransaction();
    try {
      $stadium = Stadium::create([
        'stadium_name' => $stadium_name,
        'number_of_rows' => $number_of_rows,
        'number_of_seats_per_row' => $number_of_seats_per_row,
      ]);
      DB::commit();
      return $stadium;
    } catch (\Exception $e) {
      DB::rollBack();
      return null;
    }
  }

  /**
   * only managers (role = 1) can delete a stadium from the database.
   *
   * @param string $stadium_name
   * @return Stadium
   */
  public function deleteStadium(string $stadium_name): ?Stadium
  {
    if (!$stadium_name) {
      return null;
    }
    $stadium_name = ProccessStrings::trim_replace_lower($stadium_name);
    DB::beginTransaction();
    try {
      $stadium = Stadium::where('stadium_name', $stadium_name)->first();
      $stadium->delete();
      DB::commit();
      return $stadium;
    } catch (\Exception $e) {
      DB::rollBack();
      return null;
    }
  }
}
