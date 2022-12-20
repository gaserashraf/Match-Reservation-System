<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StadiumCreationRequest extends FormRequest
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
      'stadium_name' => 'required|regex:/^[a-zA-Z-]+$/|max:255',
      'stadium_shape' => 'required|integer|gt:0',
      'stadium_max_capacity' => 'required|integer|gt:0',
    ];
  }
}
