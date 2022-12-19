<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AdminController;

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
 * User Routes 
 */

Route::post('/register', [UserController::class, 'register'])->name('register');
Route::post('/login', [UserController::class, 'login'])->name('login');
Route::post('/logout', [UserController::class, 'logout'])->name('logout');


/*
 * Adimn Routes 
 */
// Route::post('/admin/register', [UserController::class, 'adminRegister'])->name('admin.register');
// Route::post('/admin/login', [UserController::class, 'adminLogin'])->name('admin.login');
// Route::post('/admin/logout', [UserController::class, 'adminLogout'])->name('admin.logout');
Route::put('/admin/allow/{username}', [AdminController::class, 'allowUser'])->name('admin.allow')->middleware('auth:api');

