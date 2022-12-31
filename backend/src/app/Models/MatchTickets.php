<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MatchTickets extends Model
{
  use HasFactory;

  protected $table = 'match_tickets';

  protected $fillable = [
    'user_id',
    'match_id',
    'row_number',
    'seat_number',
  ];

  protected $with = [
    'user',
    'match',
  ];

  public function user()
  {
    return $this->belongsTo(User::class, 'user_id');
  }

  // TODO: change to fbmatch
  public function match()
  {
    return $this->belongsTo(FootballMatch::class, 'match_id');
  }
}
