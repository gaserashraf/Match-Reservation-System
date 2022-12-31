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
      'stadium_name' => 'required|regex:/^[a-zA-Z-_ ]+$/|max:255',
      'number_of_rows' => 'required|integer|min:1|max:100',
      'number_of_seats_per_row' => 'required|integer|min:1|max:1000',
    ];
  }
}
