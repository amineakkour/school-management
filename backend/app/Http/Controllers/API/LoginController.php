<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Models\Student;
use App\Models\Teacher;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class LoginController extends Controller
{
    public function admin_login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:8',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $credentials = ['email' => $request->input("email"), 'password' => $request->input("password")];
        
        if (!Auth::guard("admin")->attempt($credentials)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $admin = Admin::where('email', $request->email)->first();

        $token = $admin->createToken('admin-token')->plainTextToken;

        return response()->json([
            'message' => 'Login successful',
            'token' => $token,
            'user' => $admin,
        ]);
    }
    
    
    public function teacher_login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:8',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        
        $credentials = ['email' => $request->input("email"), 'password' => $request->input("password")];

        if (!Auth::guard("teacher")->attempt($credentials)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $teacher = Teacher::where('email', $request->email)->first();

        $token = $teacher->createToken('teacher-token')->plainTextToken;

        return response()->json([
            'message' => 'Login successful',
            'token' => $token,
            'user' => $teacher,
        ]);
    }


    public function student_login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:8',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $credentials = ['email' => $request->input("email"), 'password' => $request->input("password")];
        
        if (!Auth::guard("student")->attempt($credentials)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }
        
        $student = Student::where('email', $request->email)->first();

        $token = $student->createToken('student-token')->plainTextToken;

        return response()->json([
            'message' => 'Login successful',
            'token' => $token,
            'user' => $student,
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logged out successfully']);
    }

    public function logout_from_all_devices(Request $request) {
        $request->user()->tokens()->delete();

        return response()->json(['message' => 'Logged out successfully']);
    }
}
