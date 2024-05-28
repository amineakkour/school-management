<?php

use App\Http\Controllers\API\LoginController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post("/student/login", [LoginController::class, "student_login"]);
Route::post("/admin/login", [LoginController::class, "admin_login"]);
Route::post("/teacher/login", [LoginController::class, "teacher_login"]);