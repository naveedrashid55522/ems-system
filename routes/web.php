<?php

use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\RoleController;
use Illuminate\Support\Facades\Route;

Auth::routes(['register' => true]);

// Route::middleware('auth', 'role:3')->group(function () {

//     Route::get('/users', [UserController::class, 'index'])->name('users');
//     Route::get('/users/create', [UserController::class, 'create'])->name('user_create');
//     Route::post('/users/create', [UserController::class, 'store'])->name('post_user');
    
//     // Role Manager
    
//     Route::get('/role', [RoleController::class, 'index'])->name('roles');
//     Route::get('/role/create', [RoleController::class, 'create'])->name('role_create');
//     Route::post('/role/create', [RoleController::class, 'store'])->name('role_store');
// });

// Route::get('/', [HomeController::class, 'dashboard'])->name('home');
// Route::get('/admin', [HomeController::class, 'index'])->name('admin');
// Route::post('logout', [HomeController::class, 'logout'])->name('logoutUser');

// Route::get('/attendance', [AttendanceController::class, 'AttendanceShow'])->name('attendance');
// Route::post('/checkin', [AttendanceController::class, 'checkInuser'])->name('checkIn');
// Route::post('/checkOut', [AttendanceController::class, 'checkOutUser'])->name('checkOut');

// // users

// Route::get('/users', [UserController::class, 'index'])->name('users');
// Route::get('/users/create', [UserController::class, 'create'])->name('user_create');
// Route::post('/users/create', [UserController::class, 'store'])->name('post_user');

// // Role Manager

// Route::get('/role', [RoleController::class, 'index'])->name('roles');
// Route::get('/role/create', [RoleController::class, 'create'])->name('role_create');
// Route::post('/role/create', [RoleController::class, 'store'])->name('role_store');

Route::middleware(['auth', 'role:1,2'])->group(function () {
    Route::get('/users', [UserController::class, 'index'])->name('users');
    Route::get('/users/create', [UserController::class, 'create'])->name('user_create');
    Route::post('/users/create', [UserController::class, 'store'])->name('post_user');

    Route::get('/role', [RoleController::class, 'index'])->name('roles');
    Route::get('/role/create', [RoleController::class, 'create'])->name('role_create');
    Route::post('/role/create', [RoleController::class, 'store'])->name('role_store');

});

Route::get('/', [HomeController::class, 'dashboard'])->name('home');
Route::get('/admin', [HomeController::class, 'index'])->name('admin');
Route::post('logout', [HomeController::class, 'logout'])->name('logoutUser');

Route::get('/attendance', [AttendanceController::class, 'AttendanceShow'])->name('attendance');
Route::post('/checkin', [AttendanceController::class, 'checkInuser'])->name('checkIn');
Route::post('/checkOut', [AttendanceController::class, 'checkOutUser'])->name('checkOut');
