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
}
