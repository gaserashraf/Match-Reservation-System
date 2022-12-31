<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class FootballMatchResource extends JsonResource
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
      'id' => $this->id,
      'teamA_id' => TeamResource::collection($this->teamA()->get()),
      'teamB_id' => TeamResource::collection($this->teamB()->get()),
      'stadium_id' => StadiumResource::collection($this->stadium()->get()),
      'referee_id' => RefereeResource::collection($this->referee()->get()),
      'linesmanA_id' => RefereeResource::collection($this->linesmanA()->get()),
      'linesmanB_id' => RefereeResource::collection($this->linesmanB()->get()),
      'date' => $this->date,
      'time' => $this->time,
      'score' => $this->score,
    ];
  }
}
