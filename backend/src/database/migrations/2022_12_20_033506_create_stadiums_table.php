<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('stadiums', function (Blueprint $table) {
      $table->id();
      $table->string('stadium_name')->primary();
      $table->integer('number_of_rows');
      $table->integer('number_of_seats_per_row');
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::dropIfExists('stadiums');
  }
};
