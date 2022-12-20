<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Http\Misc\Helpers\ProccessStrings;

class TeamDeletionRequest extends FormRequest
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

    $team_name = ProccessStrings::trim_replace_lower($this->route('team_name'));
    $data['team_name'] = $team_name;

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
      'team_name' => [
        'required',
        'exists:teams,team_name',
      ],
    ];
  }
}
