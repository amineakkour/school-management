<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\API\LoginController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\PaymenetTrancheController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\TeacherController;
use App\Models\Student;
use App\Models\Teacher;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');



Route::resource("admins", AdminController::class);
Route::resource("students", StudentController::class);
Route::resource("teachers", TeacherController::class);
Route::resource("payment-tranches", PaymenetTrancheController::class);


Route::resource("blogs", BlogController::class);
Route::resource("messages", MessageController::class);

Route::get("students-counter", [StudentController::class, "counter"]);
Route::get("get-student-id", [StudentController::class, "student_id"]);
Route::get("teachers-counter", [TeacherController::class, "counter"]);
Route::get("admins-counter", [AdminController::class, "counter"]);

Route::post("/payment-tranches-verify", [PaymenetTrancheController::class, "verify"]);

Route::post("/logout-all-devices", [LoginController::class, "logout_from_all_devices"])->middleware("auth:sanctum");
Route::post("/logout", [LoginController::class, "logout"])->middleware("auth:sanctum");
Route::post("/student/login", [LoginController::class, "student_login"]);
Route::post("/admin/login", [LoginController::class, "admin_login"]);
Route::post("/teacher/login", [LoginController::class, "teacher_login"]);