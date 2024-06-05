<?php

namespace App\Http\Controllers;

use App\Http\Middleware\AdminMiddleware;
use App\Http\Requests\BlogRequest;
use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;


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
    
    $validator = Validator::make($request->all(), [
        'title' => 'required|string|max:100',
        'content' => 'required|min:100|string',
        'photo' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:5000',
    ], [
        'title.required' => 'Le champ titre est requis.',
        'title.string' => 'Le champ titre doit être une chaîne de caractères.',
        'title.max' => 'Le champ titre ne doit pas dépasser 100 caractères.',
        'content.required' => 'Le champ contenu est requis.',
        'content.min' => 'Le champ contenu doit comporter au moins 100 caractères.',
        'content.string' => 'Le champ contenu doit être une chaîne de caractères.',
        'photo.required' => 'Le champ photo est requis.',
        'photo.image' => 'Le champ photo doit être une image.',
        'photo.mimes' => 'Le champ photo doit être un fichier de type :jpeg, :png, :jpg, :gif, ou :svg.',
        'photo.max' => 'Le champ photo ne doit pas dépasser 5000MB.',
    ]);

    if ($validator->fails()) {
        return response()->json([
            "errors" => $validator->errors()
        ], 422);
    }

    $fileName = Str::uuid() . '.' . $request->file('photo')->getClientOriginalExtension();
    $request->file('photo')->move(public_path('photos/blogs'), $fileName);

    $blog = new Blog;
    $blog->title = $request->input("title");
    $blog->content = $request->input("content");
    $blog->photo_url = "/photos/blogs/$fileName";
    $blog->admin_id = Auth()->user()->id;
    
    $blog->save();

    return response()->json(['message' => 'Blog created successfully!', 'blog' => $blog], 201);
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

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:100',
            'content' => 'required|min:100|string',
        ], [
            'title.required' => 'Le champ titre est requis.',
            'title.string' => 'Le champ titre doit être une chaîne de caractères.',
            'title.max' => 'Le champ titre ne doit pas dépasser 100 caractères.',
            'content.required' => 'Le champ contenu est requis.',
            'content.min' => 'Le champ contenu doit comporter au moins 100 caractères.',
            'content.string' => 'Le champ contenu doit être une chaîne de caractères.',
        ]);
        
        if($validator->fails()){
            return response()->json(["errors" => $validator->errors()], 422);
        }

        $blog->title = $request->input("title", $blog->title);
        $blog->content = $request->input("content", $blog->content);
        
        if($request->hasFile("photo")) {
            $photo_validator = Validator::make($request->all(), [
                'photo' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:5000',
            ],[
                'photo.required' => 'Le champ photo est requis.',
                'photo.image' => 'Le champ photo doit être une image.',
                'photo.mimes' => 'Le champ photo doit être un fichier de type :jpeg, :png, :jpg, :gif, ou :svg.',
                'photo.max' => 'Le champ photo ne doit pas dépasser 5000MB.',
                ]
            ); 

            if($photo_validator->fails()){
                return response()->json(["errors" => $validator->errors()], 422);
            }

            $fileName = Str::uuid() . '.' . $request->file('photo')->getClientOriginalExtension();
            $request->file('photo')->move(public_path('photos/blogs'), $fileName);
            
            $blog->photo_url = "/photos/blogs/$fileName";
        }

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
