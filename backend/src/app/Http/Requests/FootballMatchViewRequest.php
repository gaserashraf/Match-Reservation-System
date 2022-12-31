<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FootballMatchViewRequest extends FormRequest
{

  protected $stopOnFirstFailure = true;

  /**
   * Determine if the user is authorized to make this request.
   *
   * @return bool
   */
  public function authorize()
  {
    return true;
  }

  /**
   * Get the validation rules that apply to the request.
   *
   * @return array<string, mixed>
   */
  public function rules()
  {
    return [

      // user can view match by any of the passed query parameters or 
      // a combination of them

      'match_id' => 'sometimes|integer|exists:football_matches,id',
      'team_id' => 'sometimes|integer|exists:teams,id',
      'stadium_id' => 'sometimes|integer|exists:stadiums,id',
      'referee_id' => 'sometimes|integer|exists:referees,id',

      // date_at is a date in the format of Y-m-d, without date_from and date_to
      'date_at' => 'sometimes|required_without_all:date_from,date_to|date|date_format:Y-m-d',

      // date_from and date_to are dates in the format of Y-m-d, without date_at
      'date_from' => 'sometimes|required_with:date_to|date|date_format:Y-m-d|before_or_equal:date_to',
      'date_to' => 'sometimes|required_with:date_from|date|date_format:Y-m-d|after_or_equal:date_from',

    ];
  }
}
