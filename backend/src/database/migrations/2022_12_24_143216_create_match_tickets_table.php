<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
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
    Schema::create('match_tickets', function (Blueprint $table) {
      $table->id();
      $table->unsignedInteger('user_id');
      $table->unsignedInteger('match_id');
      $table->unsignedInteger('row_number');
      $table->unsignedInteger('seat_number');
      $table->timestamps();

      // foreign keys
      $table->foreign('user_id')->references('id')->on('users')
        ->onDelete('cascade')->onUpdate('cascade');
      $table->foreign('match_id')->references('id')->on('football_matches')
        ->onDelete('cascade')->onUpdate('cascade');

      // constraints
      // each user can buy only one ticket for each match 
      // and each ticket can be bought only once
      $table->unique(['user_id', 'match_id']);
      $table->unique(['match_id', 'row_number', 'seat_number']);
    });

    // constraints
    // we can use the function in the constraint - psql constraint
    DB::statement('ALTER TABLE match_tickets
      ADD CONSTRAINT match_tickets_count_check
      CHECK (get_match_tickets_count(match_id) = 0 OR get_match_tickets_count(match_id) < get_stadium_capacity(match_id));
    ');

    // add constraint that the row number for each match should be less than the stadium rows
    DB::statement('ALTER TABLE match_tickets
      ADD CONSTRAINT match_tickets_row_number_check
      CHECK ("row_number" < get_stadium_rows(match_id));
    ');

    // and the seat number for each match should be less than the stadium seats per row
    DB::statement('ALTER TABLE match_tickets
      ADD CONSTRAINT match_tickets_seat_number_check
      CHECK ("seat_number" < get_stadium_seats_per_row(match_id));
    ');
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::dropIfExists('match_tickets');
  }
};
