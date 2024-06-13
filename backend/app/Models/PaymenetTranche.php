<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class PaymenetTranche extends Model
{
    use HasFactory, SoftDeletes;

    public function student(): HasOne
    {
        return $this->hasOne(Student::class);
    }
}
