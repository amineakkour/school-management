<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\API\LoginController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\TeacherController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post("/student/login", [LoginController::class, "student_login"]);
Route::post("/admin/login", [LoginController::class, "admin_login"]);
Route::post("/teacher/login", [LoginController::class, "teacher_login"]);


Route::post("/logout", [LoginController::class, "logout"])->middleware("auth:sanctum");
Route::post("/logout_from_all_devices", [LoginController::class, "logout_from_all_devices"])->middleware("auth:sanctum");

Route::resource("admin", AdminController::class);

Route::resource("student", StudentController::class);

Route::resource("teacher", TeacherController::class);