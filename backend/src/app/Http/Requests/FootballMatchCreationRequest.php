<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FootballMatchCreationRequest extends FormRequest
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
    // TODO: allow having names or ids or both for teams and stadium
    // but it won't be possible for referees, since names of referees are not unique
    return [
      // teamA_id, exists in teams table
      'teamA_id' => 'required|integer|exists:teams,id',

      // teamB_id, exists in teams table
      // teamB_id must be different from teamA_id
      'teamB_id' => 'required|integer|exists:teams,id|different:teamA_id',

      // stadium_id, exists in stadiums table
      'stadium_id' => 'required|integer|exists:stadiums,id',

      // referee_id, linesmanA_id, linesmanB_id, exists in referees table
      // and 3 of them must be different
      'referee_id' => 'required|integer|exists:referees,id',
      'linesmanA_id' => 'required|integer|exists:referees,id|different:referee_id',
      'linesmanB_id' => 'required|integer|exists:referees,id|different:referee_id|different:linesmanA_id',

      // date (like when the match will be played)
      // time having default value of 9:00pm
      // date and time must be in the future
      'date' => 'required|date|date_format:Y-m-d|after_or_equal:today',
      'time' => 'required|date_format:H:i',

      // score, null by default (when the match is not played yet)
      // should be a string like "1-0" or "2-1" or "0-0"
      'score' => 'sometimes|string|regex:/^\d+-\d+$/',
    ];
  }
}
