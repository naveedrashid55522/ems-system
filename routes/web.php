<?php

use App\Http\Controllers\PortfolioController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;

Auth::routes(['register' => false]);

Route::middleware(['auth'])->group(function () {
    Route::get('/', [PortfolioController::class, 'index'])->name('home');
    Route::get('/users', [UserController::class, 'index']);
    Route::get('/admin', [HomeController::class, 'index'])->name('admin');
    Route::post('logout', [HomeController::class, 'logout'])->name('logoutUser');
});
