<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Http\Misc\Helpers\ProccessStrings;

class StadiumDeletionRequest extends FormRequest
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

    $stadium_name = ProccessStrings::trim_replace_lower($this->route('stadium_name'));
    $data['stadium_name'] = $stadium_name;

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
      'stadium_name' => [
        'required',
        'regex:/^[a-zA-Z-]+$/',
        'max:255',
        'exists:stadiums,stadium_name',
      ],
    ];
  }
}
