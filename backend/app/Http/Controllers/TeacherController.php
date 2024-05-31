<?php

namespace App\Http\Controllers;

use App\Http\Middleware\AdminMiddleware;
use App\Models\Teacher;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Cache;

class TeacherController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            'auth:sanctum',
            new Middleware(AdminMiddleware::class),
        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Teacher::all();
    }

    /**
     * Display the count of the resource.
     */
    public function counter()
    {
        return Teacher::count();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string|max:20',
            'last_name' => 'required|string|max:20',
            'email' => 'required|string|email|max:100|unique:teachers',
            'phone_number' => 'required|string|max:10|unique:teachers',
            'birthday' => 'required|date',
            'password' => 'required|string',
            'cin' => 'required|string|max:10|unique:teachers',
            'address' => 'required|string',
            'photo' => 'nullable|string',
            'blood_type' => 'nullable|string|in:A-,A+,B-,B+,AB+,AB-,O+,O-',
            'gender' => 'required|string|in:m,f',
            'hire_date' => 'required|date',
            'last_seen' => 'nullable|date',
            'has_disability' => 'boolean',
            'disability_type' => 'nullable|string|max:50',
        ]);

        $teacher = new Teacher($request->all());
        $teacher->password = bcrypt($request->input('password'));
        $teacher->save();

        return response()->json($teacher, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Teacher $teacher)
    {
        return response()->json($teacher);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Teacher $teacher)
    {
        $request->validate([
            'first_name' => 'sometimes|required|string|max:20',
            'last_name' => 'sometimes|required|string|max:20',
            'email' => 'sometimes|required|string|email|max:100|unique:teachers,email,' . $teacher->id,
            'phone_number' => 'sometimes|required|string|max:10|unique:teachers,phone_number,' . $teacher->id,
            'birthday' => 'sometimes|required|date',
            'password' => 'nullable|string',
            'cin' => 'sometimes|required|string|max:10|unique:teachers,cin,' . $teacher->id,
            'address' => 'sometimes|required|string',
            'photo' => 'nullable|string',
            'blood_type' => 'nullable|string|in:A-,A+,B-,B+,AB+,AB-,O+,O-',
            'gender' => 'sometimes|required|string|in:m,f',
            'hire_date' => 'sometimes|required|date',
            'last_seen' => 'nullable|date',
            'has_disability' => 'boolean',
            'disability_type' => 'nullable|string|max:50',
        ]);

        $teacher->fill($request->except('password'));

        if ($request->has('password')) {
            $teacher->password = bcrypt($request->input('password'));
        }

        $teacher->save();

        return response()->json($teacher);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Teacher $teacher)
    {
        $teacher->delete();

        return response()->json(null, 204);
    }
}
