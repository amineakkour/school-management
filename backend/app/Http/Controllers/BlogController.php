<?php

namespace App\Http\Controllers;

use App\Http\Middleware\AdminMiddleware;
use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class BlogController extends Controller implements HasMiddleware
{
    /**
     * Display a listing of the resource.
     */
    public static function middleware(): array
    {
        return [
            new Middleware('auth:sanctum', except: ['index', 'show']),
            new Middleware(AdminMiddleware::class, except: ['index', 'show']),
        ];
    }
    
    public function index(Request $request)
    {
        $keyword = $request->input("keywords");

        return Blog::when($keyword, function ($query) use ($keyword) {
            return $query->where('title', 'LIKE', '%' . $keyword . '%')
                        ->orWhere('content', 'LIKE', '%' . $keyword . '%');
        })->latest()->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'photo_url' => 'nullable|url',
        ]);

        $blog = new Blog;

        $blog->title = $request->input("title");
        $blog->content = $request->input("content");
        $blog->photo_url = $request->input("photo_url");
        $blog->admin_id = auth()->user()->id;

        $blog->save();

        return response()->json($blog, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Blog $blog)
    {
        return response()->json($blog);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Blog $blog)
    {
        $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'content' => 'sometimes|required|string',
            'photo_url' => 'nullable|url',
        ]);

        $blog->title = $request->input("title", $blog->title);
        $blog->content = $request->input("content", $blog->content);
        $blog->photo_url = $request->input("photo_url", $blog->photo_url);

        $blog->save();

        return response()->json($blog);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Blog $blog)
    {
        $blog->delete();

        return response()->json(null, 204);
    }
}
