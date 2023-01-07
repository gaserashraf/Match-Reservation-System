<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;
use App\Http\Misc\Helpers\Errors;

class UserRegisterRequest extends FormRequest
{
  /**
   * Indicates if the validator should stop on the first rule failure.
   *
   * @var bool
   */
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
      // TODO: which of those should be required for registeration?
      'first_name' => 'required|regex:/^[a-zA-Z-]+$/u',
      'last_name' => 'required|regex:/^[a-zA-Z-]+$/u',
      'gender' => 'required|boolean',
      'birth_date' => 'required|date|before:today',

      // TODO: whether to adjust nationality to be part of pre-defined array or not?
      'nationality' => 'required|regex:/^[a-zA-Z-]+$/u',

      // role is one of the following: 0 => 'admin', 1 => 'manager', 2 => 'customer'
      'role' => 'required|integer|between:1,2',
      'email' => 'required|email|unique:users',
      'username' => 'required|regex:/^[a-zA-Z0-9-]+$/u',
      'password' => ['required', Password::min(8)->mixedCase()->numbers()],
    ];
  }
}
