<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MatchTicketsBuyRequest extends FormRequest
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
      'match_id' => 'required|integer|exists:matches,id',
      'row_number' => 'required|integer|gt:0',
      'seat_number' => 'required|integer|gt:0',
    ];
  }
}
