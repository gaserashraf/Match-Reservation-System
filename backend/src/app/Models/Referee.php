<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Referee extends Model
{
  use HasFactory;

  protected $table = 'referees';

  protected $fillable = [
    'referee_name',
    'referee_email',
  ];

  public function asReferee()
  {
    return $this->hasMany(FootballMatch::class, 'referee_id');
  }

  public function asLinesmanA()
  {
    return $this->hasMany(FootballMatch::class, 'linesmanA_id');
  }

  public function asLinesmanB()
  {
    return $this->hasMany(FootballMatch::class, 'linesmanB_id');
  }

  public function allMatches()
  {
    return $this->asReferee->merge($this->asLinesmanA)->merge($this->asLinesmanB);
  }
}
