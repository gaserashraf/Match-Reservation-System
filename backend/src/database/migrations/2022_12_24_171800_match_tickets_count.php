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
    // count of tickets for each match should be less than stadium capacity
    // which equals to stadium rows * stadium columns, not stored in football_matches table
    // but as stadiums.numbers_of_rows * stadiums.number_of_seats_per_row

    // so since that check is going to happen a lot of times, we can create a view
    // to make it faster and easier to use in the future if needed
    DB::statement('CREATE VIEW match_tickets_count AS
        SELECT match_id, COUNT(*) AS count, stadiums.number_of_rows * stadiums.number_of_seats_per_row AS stadium_capacity
        FROM match_tickets
        JOIN football_matches ON football_matches.id = match_tickets.match_id
        JOIN stadiums ON stadiums.id = football_matches.stadium_id
        GROUP BY match_id, stadium_capacity
      ');

    // is that view table is going to update automatically when we insert, update or delete?
    // yes, because we are using the match_tickets table in the view definition
    // and match_tickets table is the one that is going to be updated
    // so we don't need to create a trigger to update the view table
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    DB::statement('DROP VIEW IF EXISTS match_tickets_count');
  }
};
