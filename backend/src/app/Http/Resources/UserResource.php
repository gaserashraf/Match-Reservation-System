<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
      'first_name' => $this->first_name,
      'last_name' => $this->last_name,
      'birth_date' => $this->birth_date,
      'nationality' => $this->nationality,
      'gender' => $this->gender,
      'role' => $this->role,
      'username' => $this->username,
      'email' => $this->email,
      'is_verified' => ($this->email_verified_at != null),
      'access_token' =>  $this->token(),
    ];
  }
}
