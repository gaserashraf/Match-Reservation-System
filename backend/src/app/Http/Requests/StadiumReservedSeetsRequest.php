<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StadiumReservedSeetsRequest extends FormRequest
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
    $data['stadium_id'] = $this->route('stadium_id');
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
      'stadium_id' => 'required|integer|exists:stadiums,id',
      'match_id' => 'required|integer|exists:football_matches,id',
    ];
  }
}
