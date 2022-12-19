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
    Schema::create('users', function (Blueprint $table) {
      $table->id();

      $table->string('first_name')->nullable;
      $table->string('last_name')->nullable;
      $table->date('birth_date')->nullable;

      // we have just males and females {0, 1} no other nonsense is allowed here
      $table->boolean('gender')->default(0);
      $table->string('nationality')->nullable()->default('US');

      // add column for user role in the system {0=admin, 1=manager, 2=customer}
      $table->tinyInteger('role')->default(2);

      // represnt if one of the admins has allowed the user to login to the system or not
      $table->boolean('allowed')->default(0);

      $table->string('username')->unique();
      $table->string('email')->unique();
      $table->string('password');
      $table->timestamp('email_verified_at')->nullable();
      $table->rememberToken();
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
    Schema::dropIfExists('users');
  }
};
