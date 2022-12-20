<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Stadium extends Model
{
  use HasFactory;

  protected $fillable = [
    'stadium_name',
    'number_of_rows',
    'number_of_seats_per_row',
  ];
}
