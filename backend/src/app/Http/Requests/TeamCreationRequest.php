<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TeamCreationRequest extends FormRequest
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
      'team_name' => 'required|regex:/^[a-zA-Z-_ ]+$/|max:255',
    ];
  }
}
