<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

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
    $data['team_name'] = trim($data['team_name'])->replace(' ', '-');
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
        'regex:/^[a-zA-Z-]+$/',
        'max:255',
        'exists:teams,team_name',
      ],
    ];
  }
}
