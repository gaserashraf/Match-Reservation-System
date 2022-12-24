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
    Schema::create('football_matches', function (Blueprint $table) {
      $table->id();
      // match has 2 teams
      $table->unsignedInteger('teamA_id');
      $table->unsignedInteger('teamB_id');
      // it's played in one stadium
      $table->unsignedInteger('stadium_id');
      // match has one referee
      $table->unsignedInteger('referee_id');
      // it has 2 linesmen, they're referees too
      $table->unsignedInteger('linesmanA_id');
      $table->unsignedInteger('linesmanB_id');
      // has a score, score can be null if it's not played yet
      // it's in format "teamA_score-teamB_score"
      $table->string('score')->nullable();
      // date and time can be null if it's not played yet
      $table->date('date')->nullable();
      $table->time('time')->nullable()->default('21:00');

      // created_at and updated_at, for tracking changes
      $table->timestamps();

      // foreign keys
      // teamA_id, teamB_id can't be the same
      $table->foreign('teamA_id')->references('id')->on('teams')
        ->onUpdate('cascade')->onDelete('cascade');
      $table->foreign('teamB_id')->references('id')->on('teams')
        ->onUpdate('cascade')->onDelete('cascade');

      $table->foreign('stadium_id')->references('id')->on('stadiums')
        ->onUpdate('cascade')->onDelete('cascade');

      // referee_id, linesmanA_id, linesmanB_id can't be the same
      $table->foreign('referee_id')->references('id')->on('referees')
        ->onUpdate('cascade')->onDelete('cascade');
      $table->foreign('linesmanA_id')->references('id')->on('referees')
        ->onUpdate('cascade')->onDelete('cascade');
      $table->foreign('linesmanB_id')->references('id')->on('referees')
        ->onUpdate('cascade')->onDelete('cascade');

      // constraints
      // each team should play one match per day
      $table->unique(['teamA_id', 'date']);
      $table->unique(['teamB_id', 'date']);

      // each referee should referee one match per day
      // each linesman should be a linesman in one match per day
      $table->unique(['referee_id', 'date']);
      $table->unique(['linesmanA_id', 'date']);
      $table->unique(['linesmanB_id', 'date']);

      // each stadium should host one match per day
      // TODO: can relax this later, such that having a match every maybe 4 hours is ok
      $table->unique(['stadium_id', 'date']);

      // teamA_id and teamB_id can't be the same for same row, add psql constraint
      DB::statement('ALTER TABLE football_matches ADD CONSTRAINT teamA_id_not_equal_teamB_id CHECK (teamA_id != teamB_id)');
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::dropIfExists('football_matches');
  }
};
