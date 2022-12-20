<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class StadiumResource extends JsonResource
{
  /**
   * Transform the resource into an array.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
   */
  public function toArray($request)
  {
    return [
      'stadium_id' => $this->stadium_id,
      'stadium_name' => $this->stadium_name,
      'number_of_rows' => $this->number_of_rows,
      'number_of_seats_per_row' => $this->number_of_seats_per_row,
    ];
  }
}
