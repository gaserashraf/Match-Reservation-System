<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rules\Password;
use Illuminate\Foundation\Http\FormRequest;

class UserUpdateRequest extends FormRequest
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
      'first_name' => 'sometimes|regex:/^[a-zA-Z-]+$/u',
      'last_name' => 'sometimes|regex:/^[a-zA-Z-]+$/u',
      'gender' => 'sometimes|boolean',
      'birth_date' => 'sometimes|date',

      'nationality' => 'sometimes|regex:/^[a-zA-Z-]+$/u',

      'password' => ['sometimes', Password::min(8)->mixedCase()->numbers()],
    ];
  }
}
