<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AllowUserRequest extends FormRequest
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
   * Include the query parameters in the request body data inorder to apply validation on it
   *
   * @return array
   */
  public function all($keys = null)
  {
    $data = parent::all($keys);
    $data['username'] = $this->route('username');
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
      'username' => [
        'required',
        'regex:/^[a-zA-Z0-9-]+$/u',
        'exists:users,username',
      ],
    ];
  }
}
