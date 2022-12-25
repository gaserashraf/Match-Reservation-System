<?php

namespace App\Http\Services;

use App\Models\Stadium;
use Illuminate\Support\Facades\DB;
use App\Http\Misc\Helpers\ProccessStrings;

class StadiumService
{
  /**
   * Get all stadiums
   * 
   * @return Collection | null
   */
  public function getAllStadiums(): ?Collection
  {
    $stadiums = Stadium::all();
    if (!$stadiums) {
      return null;
    }
    return $stadiums;
  }

  /**
   * Get all reserved seats for a match
   *
   * @param int $stadium_name
   * @param int $match_id
   * @return array | null
   */
  public function getReservedSeats(int $stadium_id, int $match_id): ?array
  {
    $stadium = Stadium::where('id', $stadium_id)->first();
    if (!$stadium) {
      return null;
    }
    $reserved_seats = $stadium->getReservedSeats($match_id);
    return $reserved_seats;
  }

  /**
   * only managers (role = 1) can add a new stadium to the database.
   *
   * @param string $stadium_name
   * @param string $stadium_shape
   * @param string $stadium_max_capacity
   * @return Stadium
   */
  public function addStadium(string $stadium_name, int $number_of_rows, int $number_of_seats_per_row): ?Stadium
  {
    $stadium_name = ProccessStrings::trim_replace_lower($stadium_name);
    try {
      DB::beginTransaction();
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
    try {
      DB::beginTransaction();
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
