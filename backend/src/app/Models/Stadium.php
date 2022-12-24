<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Stadium extends Model
{
  use HasFactory;

  protected $table = 'stadiums';

  protected $fillable = [
    'stadium_name',
    'number_of_rows',
    'number_of_seats_per_row',
  ];

  public function matches()
  {
    return $this->hasMany(FootballMatch::class, 'stadium_id');
  }

  public function getCapacityAttribute()
  {
    return $this->number_of_rows * $this->number_of_seats_per_row;
  }
}
