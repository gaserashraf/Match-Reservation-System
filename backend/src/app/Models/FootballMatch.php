<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FootballMatch extends Model
{
  use HasFactory;

  protected $table = 'football_matches';

  protected $fillable = [
    'teamA_id',
    'teamB_id',
    'stadium_id',
    'referee_id',
    'linesmanA_id',
    'linesmanB_id',
    'score',
    'date',
    'time',
  ];

}
