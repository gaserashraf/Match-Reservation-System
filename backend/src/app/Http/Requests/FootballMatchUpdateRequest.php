<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FootballMatchUpdateRequest extends FormRequest
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

  public function all($keys = null)
  {
    $data = parent::all($keys);
    $data['match_id'] = $this->route('match_id');
    return $data;
  }

  /**
   * Get the validation rules that apply to the request.
   *
   * @return array<string, mixed>
   */
  public function rules()
  {
    return [
      // selecting which match to update
      'match_id' => 'required|integer|exists:football_matches,id',

      // updating match data
      // sometimes is used to allow the user to update only the fields that are passed
      // in the request or a combination of them
      'teamA_id' => 'sometimes|integer|exists:teams,id',
      'teamB_id' => 'sometimes|integer|exists:teams,id|different:teamA_id',

      'stadium_id' => 'sometimes|integer|exists:stadiums,id',

      'referee_id' => 'sometimes|integer|exists:referees,id',
      'linesmanA_id' => 'sometimes|integer|exists:referees,id|different:referee_id',
      'linesmanB_id' => 'sometimes|integer|exists:referees,id|different:referee_id|different:linesmanA_id',

      'date' => 'sometimes|date|date_format:Y-m-d|after_or_equal:today',
      'time' => 'sometimes|date_format:H:i',

      'score' => 'sometimes|string|regex:/^\d+-\d+$/',
    ];
  }
}
