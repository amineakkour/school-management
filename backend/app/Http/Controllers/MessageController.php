<?php

namespace App\Http\Controllers;

use App\Http\Middleware\AdminMiddleware;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class MessageController extends Controller implements HasMiddleware
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
        $is_seen = $request->input("seen"); // return 'false' or 'true'

        $messages = Message::when($limit, function ($query) use($limit) {
            return $query->limit($limit);
        })->when($is_seen, function ($query) use($is_seen) {
            if($is_seen == 'true'){
                return $query->whereNotNull('seen_at');
            }else{
                return $query->whereNull('seen_at');
            }
        })->get();
        
        return $messages;
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
    public function show(Message $message)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Message $message)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Message $message)
    {
        //
    }
}
