<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\StadiumController;
use App\Http\Controllers\RefereeController;
use App\Http\Controllers\FootballMatchController;
use App\Http\Controllers\MatchTicketsController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/*
 * General User Routes 
 */
Route::post('/register', [UserController::class, 'register'])->name('register');
Route::post('/login', [UserController::class, 'login'])->name('login');
Route::post('/logout', [UserController::class, 'logout'])->name('logout');


/*
 * Adimn Specific Routes 
 */
Route::group(['prefix' => 'admin'], function () {
  // Route::post('/register', [AdminController::class, 'register'])->name('admin.register');
  // Route::post('/login', [AdminController::class, 'login'])->name('admin.login');
  // Route::post('/logout', [AdminController::class, 'logout'])->name('admin.logout');
  Route::group(['middleware' => ['auth:api', 'role:0']], function () {
    Route::get('/users/new', [AdminController::class, 'getNewUsers'])->name('admin.users');
    Route::get('/users/current', [AdminController::class, 'getCurrentUsers'])->name('admin.users');
    Route::put('allow/{username}', [AdminController::class, 'allowUser'])->name('admin.allow');
    Route::delete('delete/{username}', [AdminController::class, 'deleteUser'])->name('admin.delete');
  });
});


/*
 * Manager Specific Routes 
 */
Route::group(['middleware' => ['auth:api', 'role:1']], function () {
  // edit profile
  Route::put('/update/profile', [UserController::class, 'editProfile'])->name('user.edit');
  // Team Routes
  Route::group(['prefix' => 'team'], function () {
    Route::post('add', [TeamController::class, 'addTeam'])->name('team.add');
    Route::delete('delete/{team_name}', [TeamController::class, 'deleteTeam'])->name('team.delete');
  });
  // Stadium Routes
  Route::group(['prefix' => 'stadium'], function () {
    Route::post('add', [StadiumController::class, 'addStadium'])->name('stadium.add');
    Route::delete('delete/{stadium_name}', [StadiumController::class, 'deleteStadium'])->name('stadium.delete');
  });
  // Referee Routes
  Route::group(['prefix' => 'referee'], function () {
    Route::post('add', [RefereeController::class, 'addReferee'])->name('referee.add');
    Route::delete('delete/{referee_id}', [RefereeController::class, 'deleteReferee'])->name('referee.delete');
  });
  // Football Match Routes
  Route::group(['prefix' => 'fbmatch'], function () {
    Route::post('add', [FootballMatchController::class, 'addMatch'])->name('fbmatch.add');
    Route::delete('delete/{match_id}', [FootballMatchController::class, 'deleteMatch'])->name('fbmatch.delete');
    Route::put('update/{match_id}', [FootballMatchController::class, 'updateMatch'])->name('fbmatch.update');
  });
});

/*
 * Customer Specific Routes 
 */
Route::group(['middleware' => ['auth:api', 'role:2']], function () {
  // edit profile
  Route::put('/update/profile', [UserController::class, 'editProfile'])->name('user.edit');
  // Match Tickets Routes
  Route::group(['prefix' => 'ticket'], function () {
    Route::post('buy', [MatchTicketsController::class, 'buyTicket'])->name('ticket.buy');
    Route::get('mytickets', [MatchTicketsController::class, 'showAllTickets'])->name('ticket.mytickets');
    Route::delete('cancel/{ticket_id}', [MatchTicketsController::class, 'cancelTicket'])->name('ticket.cancel');
  });
});

/*
 * Any User can access these routes 
 */
Route::get('team/all', [TeamController::class, 'getAllTeams'])->name('referee.all');
Route::get('referee/all', [RefereeController::class, 'getAllReferees'])->name('referee.all');

Route::get('stadium/all', [StadiumController::class, 'getAllStadiums'])->name('referee.all');
Route::get('stadium/reserved_seats/{stadium_id}/{match_id}', [StadiumController::class, 'getReservedSeatsPerMatch'])->name('stadium.reserved_seats');

// Football Match Routes
// user can get all matches (by default) or
// - get a specific match by id (match_id)
// - get all matches of a specific team (team_name or team_id)
// - get all matches on a specific stadium (stadium_name or stadium_id)
// - get all matches having a specific referee (referee_id)
// - get all matches on a specific date (date_at) or between two dates (date_from, date_to)
// or a combination of the above, using query parameters with the following routes
Route::get('fbmatch/view', [FootballMatchController::class, 'viewMatches'])->name('fbmatch.view');
