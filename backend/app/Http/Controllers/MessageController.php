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
            new Middleware('auth:sanctum', except: ['store']),
            new Middleware(AdminMiddleware::class, except: ['store']),
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
        })->orderBy('id', 'desc')->get();
        
        return $messages;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $message = new Message();

        $message->name = $request->input('fullName');
        $message->phone_number = $request->input('phoneNumber');
        $message->title = $request->input('messageObject');
        $message->message = $request->input('message');

        $message->save();

        return response()->json(["message" => 'Message sent']); 
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
    public function update(Message $message)
    {
        //update method is only charge to set seen_at property

        if($message->seen_at){
            
            return response()->json(["error" => "The message has been previously verified"], 409);
        }else{
            $message->seen_at = now();

            $message->save();
        };
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Message $message)
    {
        //
    }
}
