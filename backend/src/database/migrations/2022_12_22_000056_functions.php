<?php

use Illuminate\Support\Facades\DB;
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
    // HELPERs
    // function to get the number of tickets reserved for a match from (match_tickets_count view table)
    DB::statement('CREATE OR REPLACE FUNCTION get_match_tickets_count(match_id integer) RETURNS integer AS $$
      BEGIN
        RETURN (SELECT count FROM match_tickets_count WHERE match_tickets_count.match_id = $1);
      END;
      $$ LANGUAGE plpgsql;
    ');

    // function to get the stadium capacity from (match_tickets_count view table)
    DB::statement('CREATE OR REPLACE FUNCTION get_stadium_capacity(match_id integer) RETURNS integer AS $$
      BEGIN
        RETURN (SELECT stadium_capacity FROM match_tickets_count WHERE match_tickets_count.match_id = $1);
      END;
      $$ LANGUAGE plpgsql;
    ');

    // function to retreive the number of rows and seats per row from the stadium table
    DB::statement('CREATE OR REPLACE FUNCTION get_stadium_rows(match_id integer) RETURNS integer AS $$
      BEGIN
        RETURN (SELECT number_of_rows FROM stadiums
          JOIN football_matches ON football_matches.stadium_id = stadiums.id
          WHERE football_matches.id = $1);
      END;
      $$ LANGUAGE plpgsql;
    ');

    // function to retreive the number of seats per row from the stadium table
    DB::statement('CREATE OR REPLACE FUNCTION get_stadium_seats_per_row(match_id integer) RETURNS integer AS $$
      BEGIN
        RETURN (SELECT number_of_seats_per_row FROM stadiums
          JOIN football_matches ON football_matches.stadium_id = stadiums.id
          WHERE football_matches.id = $1);
      END;
      $$ LANGUAGE plpgsql;
    ');
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    // drop the functions
    DB::statement('DROP FUNCTION IF EXISTS get_match_tickets_count(match_id integer)');
    DB::statement('DROP FUNCTION IF EXISTS get_stadium_capacity(match_id integer)');
    DB::statement('DROP FUNCTION IF EXISTS get_stadium_seats_per_row(match_id integer)');
  }
};
