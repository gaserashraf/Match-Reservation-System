<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
  use HasFactory;

  protected $table = 'teams';

  protected $fillable = [
    'team_name',
  ];

  public function homeMatches()
  {
    return $this->hasMany(FootballMatch::class, 'teamA_id');
  }

  public function awayMatches()
  {
    return $this->hasMany(FootballMatch::class, 'teamB_id');
  }

  public function allMatches()
  {
    return $this->homeMatches->merge($this->awayMatches);
  }
}
