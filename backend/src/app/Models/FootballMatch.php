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

  // add the with() method to the model to eager load the relationships
  // that are used in the view
  protected $with = [
    'teamA',
    'teamB',
    'stadium',
    'referee',
    'linesmanA',
    'linesmanB',
  ];

  public function teamA()
  {
    return $this->belongsTo(Team::class, 'teamA_id');
  }

  public function teamB()
  {
    return $this->belongsTo(Team::class, 'teamB_id');
  }

  public function stadium()
  {
    return $this->belongsTo(Stadium::class);
  }

  public function referee()
  {
    return $this->belongsTo(Referee::class);
  }

  public function linesmanA()
  {
    return $this->belongsTo(Referee::class, 'linesmanA_id');
  }

  public function linesmanB()
  {
    return $this->belongsTo(Referee::class, 'linesmanB_id');
  }

  public function tickets()
  {
    return $this->hasMany(MatchTickets::class, 'match_id', 'id');
  }

}
