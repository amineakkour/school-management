<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;

class Teacher extends Authenticatable
{
    use HasFactory, SoftDeletes, HasApiTokens;

    protected $hidden = ['password', 'remember_token'];

    public $appends = ["role"];

    public function getRoleAttribute() {
        return "teacher";
    }
}
