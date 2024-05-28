<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('group_subjects', function (Blueprint $table) {
            $table->id();
    
            $table->unsignedBigInteger("teacher_id");
            $table->unsignedBigInteger("group_id");
            $table->unsignedBigInteger("subject_id");
    
            $table->foreign("teacher_id")->references("id")->on("teachers");
            $table->foreign("group_id")->references("id")->on("groups");
            $table->foreign("subject_id")->references("id")->on("subjects");
    
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('group_subjects');
    }
};
