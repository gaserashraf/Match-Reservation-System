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
    'row',
    'seat',
  ];

  protected $with = [
    'user',
    'match',
  ];

  public function user()
  {
    return $this->belongsTo(User::class, 'user_id');
  }

  public function fbmatch()
  {
    return $this->belongsTo(FootballMatch::class, 'match_id');
  }
}
