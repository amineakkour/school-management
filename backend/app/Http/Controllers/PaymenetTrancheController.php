<?php

namespace App\Http\Controllers;

use App\Http\Middleware\AdminMiddleware;
use App\Models\PaymenetTranche;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;


class PaymenetTrancheController extends Controller implements HasMiddleware
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
    public function index(Request $request)
    {
        
        $limit = $request->input("limit");

        $paymentTranches = PaymenetTranche::when($limit, function ($query, $limit) {
            return $query->limit($limit);
        })->get();

        return response()->json($paymentTranches);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(PaymenetTranche $paymenetTranche)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, PaymenetTranche $paymenetTranche)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PaymenetTranche $paymenetTranche)
    {
        //
    }
}
