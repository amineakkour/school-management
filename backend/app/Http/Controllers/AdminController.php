<?php

namespace App\Http\Controllers;

use App\Http\Middleware\AdminMiddleware;
use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class AdminController extends Controller implements HasMiddleware
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
        return Admin::all();
    }

    /**
     * Display the count of the resource.
     */
    public function counter()
    {
        return Admin::count();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string|max:20',
            'last_name' => 'required|string|max:20',
            'email' => 'required|string|email|max:100|unique:admins',
            'phone_number' => 'required|string|max:10|unique:admins',
            'birthday' => 'required|date',
            'password' => 'required|string',
            'cin' => 'required|string|max:10|unique:admins',
            'address' => 'required|string',
            'photo' => 'nullable|string',
            'blood_type' => 'nullable|string|in:A-,A+,B-,B+,AB+,AB-,O+,O-',
            'gender' => 'required|string|in:m,f',
            'hire_date' => 'required|date',
            'last_seen' => 'nullable|date',
            'has_disability' => 'boolean',
            'disability_type' => 'nullable|string|max:50',
        ]);

        $admin = new Admin($request->all());
        $admin->password = bcrypt($request->input('password'));
        $admin->save();

        return response()->json($admin, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Admin $admin)
    {
        return response()->json($admin);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Admin $admin)
    {
        $request->validate([
            'first_name' => 'sometimes|required|string|max:20',
            'last_name' => 'sometimes|required|string|max:20',
            'email' => 'sometimes|required|string|email|max:100|unique:admins,email,' . $admin->id,
            'phone_number' => 'sometimes|required|string|max:10|unique:admins,phone_number,' . $admin->id,
            'birthday' => 'sometimes|required|date',
            'password' => 'nullable|string',
            'cin' => 'sometimes|required|string|max:10|unique:admins,cin,' . $admin->id,
            'address' => 'sometimes|required|string',
            'photo' => 'nullable|string',
            'blood_type' => 'nullable|string|in:A-,A+,B-,B+,AB+,AB-,O+,O-',
            'gender' => 'sometimes|required|string|in:m,f',
            'hire_date' => 'sometimes|required|date',
            'last_seen' => 'nullable|date',
            'has_disability' => 'boolean',
            'disability_type' => 'nullable|string|max:50',
        ]);

        $admin->fill($request->except('password'));

        if ($request->has('password')) {
            $admin->password = bcrypt($request->input('password'));
        }

        $admin->save();

        return response()->json($admin);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Admin $admin)
    {
        $admin->delete();

        return response()->json(null, 204);
    }
}
