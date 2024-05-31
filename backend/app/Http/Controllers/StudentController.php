<?php

namespace App\Http\Controllers;

use App\Http\Middleware\AdminMiddleware;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Cache;

class StudentController extends Controller implements HasMiddleware
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
        return Student::all();
    }

    /**
     * Display the count of the resource.
     */
    public function counter()
    {
        return Student::count();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string|max:20',
            'last_name' => 'required|string|max:20',
            'email' => 'required|string|email|max:100|unique:students',
            'phone_number' => 'nullable|string|max:10',
            'password' => 'required|string',
            'cin' => 'nullable|string|max:10|unique:students',
            'address' => 'required|string',
            'birthday' => 'required|date',
            'photo' => 'nullable|string',
            'blood_type' => 'nullable|string|in:A-,A+,B-,B+,AB+,AB-,O+,O-',
            'gender' => 'required|string|in:m,f',
            'last_seen' => 'nullable|date',
            'has_disability' => 'boolean',
            'disability_type' => 'nullable|string|max:50',
            'parent_full_name' => 'required|string|max:50',
            'parent_phone_number' => 'required|string|max:10',
            'parent_blood_type' => 'nullable|string|in:A-,A+,B-,B+,AB+,AB-,O+,PO-',
            'parenting_job' => 'nullable|string|max:50',
        ]);

        $student = new Student($request->all());
        $student->password = bcrypt($request->input('password'));
        $student->save();

        return response()->json($student, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Student $student)
    {
        return response()->json($student);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Student $student)
    {
        $request->validate([
            'first_name' => 'sometimes|required|string|max:20',
            'last_name' => 'sometimes|required|string|max:20',
            'email' => 'sometimes|required|string|email|max:100|unique:students,email,' . $student->id,
            'phone_number' => 'nullable|string|max:10',
            'password' => 'nullable|string',
            'cin' => 'nullable|string|max:10|unique:students,cin,' . $student->id,
            'address' => 'sometimes|required|string',
            'birthday' => 'sometimes|required|date',
            'photo' => 'nullable|string',
            'blood_type' => 'nullable|string|in:A-,A+,B-,B+,AB+,AB-,O+,O-',
            'gender' => 'sometimes|required|string|in:m,f',
            'last_seen' => 'nullable|date',
            'has_disability' => 'boolean',
            'disability_type' => 'nullable|string|max:50',
            'parent_full_name' => 'sometimes|required|string|max:50',
            'parent_phone_number' => 'sometimes|required|string|max:10',
            'parent_blood_type' => 'nullable|string|in:A-,A+,B-,B+,AB+,AB-,O+,PO-',
            'parenting_job' => 'nullable|string|max:50',
        ]);

        $student->fill($request->except('password'));

        if ($request->has('password')) {
            $student->password = bcrypt($request->input('password'));
        }

        $student->save();

        return response()->json($student);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Student $student)
    {
        $student->delete();

        return response()->json(null, 204);
    }
}
