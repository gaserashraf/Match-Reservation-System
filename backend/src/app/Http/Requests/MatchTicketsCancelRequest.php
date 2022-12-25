<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MatchTicketsCancelRequest extends FormRequest
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
    $data['ticket_id'] = $this->route('ticket_id');
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
      'ticket_id' => 'required|integer|gt:0|exists:match_tickets,id',
    ];
  }
}
