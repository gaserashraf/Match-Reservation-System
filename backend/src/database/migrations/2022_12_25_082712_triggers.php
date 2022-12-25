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
    // TRIGGERs
    // - on updating a stadium in the stadiums table
    // 1. delete from match_tickets table all tickets that exceed the new stadium (rows, seats per row)
    DB::statement('CREATE OR REPLACE FUNCTION delete_violating_tickets_on_stadium_update_1() RETURNS trigger AS $$
      DECLARE
        match_id_var integer;
      BEGIN
        match_id_var := (SELECT id FROM football_matches WHERE football_matches.stadium_id = OLD.id);
        DELETE FROM match_tickets
        WHERE match_tickets.match_id = match_id_var
        AND (match_tickets.row_number >= NEW.number_of_rows OR match_tickets.seat_number >= NEW.number_of_seats_per_row);
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
    ');
    DB::statement('CREATE TRIGGER delete_violating_tickets_on_stadium_update_trigger_1
      AFTER UPDATE ON stadiums
      FOR EACH ROW
      EXECUTE PROCEDURE delete_violating_tickets_on_stadium_update_1();
    ');

    // 2. delete the recent match_tickets until the number of tickets reserved 
    // for the match is less than the new stadium capacity
    DB::statement('CREATE OR REPLACE FUNCTION delete_violating_tickets_on_stadium_update_2() RETURNS trigger AS $$
      DECLARE
        match_id_var integer;
        tickets_to_delete integer;
      BEGIN
        match_id_var := (SELECT id FROM football_matches WHERE football_matches.stadium_id = OLD.id);
        tickets_to_delete := get_match_tickets_count(match_id_var) - get_stadium_capacity(match_id_var);
        IF tickets_to_delete IS NULL THEN
          tickets_to_delete := 0;
        END IF;
        DELETE FROM match_tickets
        WHERE match_tickets.match_id = match_id_var
        AND match_tickets.id IN (
          SELECT match_tickets.id FROM match_tickets
          WHERE match_tickets.match_id = match_id_var
          ORDER BY match_tickets.created_at DESC
          LIMIT GREATEST(0, tickets_to_delete)
        );
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
    ');
    DB::statement('CREATE TRIGGER delete_violating_tickets_on_stadium_update_trigger_2
      AFTER UPDATE ON stadiums
      FOR EACH ROW
      EXECUTE PROCEDURE delete_violating_tickets_on_stadium_update_2();
    ');

    // - on updating a football_match stadium_id in the football_matches table
    // score is null means the match is not played yet 
    // 1. delete from match_tickets table all tickets that exceed the new stadium (rows, seats per row)
    DB::statement('CREATE OR REPLACE FUNCTION delete_violating_tickets_on_stadium_update_3() RETURNS TRIGGER AS $$
      BEGIN
        DELETE FROM match_tickets
        WHERE match_id = OLD.id
        AND (row_number > (SELECT number_of_rows FROM stadiums WHERE id = NEW.stadium_id)
        OR seat_number > (SELECT number_of_seats_per_row FROM stadiums WHERE id = NEW.stadium_id));
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
    ');
    DB::statement('CREATE TRIGGER delete_tickets_on_stadium_update_trigger_3
      BEFORE UPDATE ON football_matches
      FOR EACH ROW
      WHEN (OLD.stadium_id != NEW.stadium_id AND OLD.score IS NULL)
      EXECUTE PROCEDURE delete_violating_tickets_on_stadium_update_3();
    ');

    // 2. delete the recent match_tickets until the number of tickets reserved
    // for the match is less than the new stadium capacity
    DB::statement('CREATE OR REPLACE FUNCTION delete_violating_tickets_on_stadium_update_4() RETURNS TRIGGER AS $$
      DECLARE
        tickets_to_delete integer;
      BEGIN
        tickets_to_delete := get_match_tickets_count(OLD.id) - get_stadium_capacity(OLD.id);
        IF tickets_to_delete IS NULL THEN
          tickets_to_delete := 0;
        END IF;
        DELETE FROM match_tickets
        WHERE match_id = OLD.id
        AND id IN (
          SELECT id FROM match_tickets
          WHERE match_id = OLD.id
          ORDER BY created_at DESC
          LIMIT GREATEST(0, tickets_to_delete)
        );
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
    ');
    DB::statement('CREATE TRIGGER delete_tickets_on_stadium_update_trigger_4
      BEFORE UPDATE ON football_matches
      FOR EACH ROW
      WHEN (OLD.stadium_id != NEW.stadium_id AND OLD.score IS NULL)
      EXECUTE PROCEDURE delete_violating_tickets_on_stadium_update_4();
    ');
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    // drop functions
    DB::statement('DROP FUNCTION IF EXISTS delete_violating_tickets_on_stadium_update_1()');
    DB::statement('DROP FUNCTION IF EXISTS delete_violating_tickets_on_stadium_update_2()');
    DB::statement('DROP FUNCTION IF EXISTS delete_violating_tickets_on_stadium_update_3()');
    DB::statement('DROP FUNCTION IF EXISTS delete_violating_tickets_on_stadium_update_4()');

    // drop triggers
    DB::statement('DROP TRIGGER IF EXISTS delete_violating_tickets_on_stadium_update_trigger_1 ON stadiums');
    DB::statement('DROP TRIGGER IF EXISTS delete_violating_tickets_on_stadium_update_trigger_2 ON stadiums');
    DB::statement('DROP TRIGGER IF EXISTS delete_tickets_on_stadium_update_trigger_3 ON football_matches');
    DB::statement('DROP TRIGGER IF EXISTS delete_tickets_on_stadium_update_trigger_4 ON football_matches');
  }
};
