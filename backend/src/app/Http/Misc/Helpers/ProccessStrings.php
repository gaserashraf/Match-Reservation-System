<?php

namespace App\Http\Misc\Helpers;

class ProccessStrings
{

  public static function trim_replace_lower(string $string, string $replace = ' ', string $with = '-'): string
  {
    $string = trim($string);
    $string = str_replace($replace, $with, $string);
    $string = strtolower($string);
    return $string;
  }
}
