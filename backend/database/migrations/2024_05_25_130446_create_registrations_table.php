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
        Schema::create('registrations', function (Blueprint $table) {
            $table->id();
            
            $table->unsignedSmallInteger("school_year");

            $table->unsignedBigInteger("student_id");
            $table->unsignedBigInteger("group_id");
            $table->unsignedBigInteger("created_by"); // Ex: Created by admin has id 51
            
            $table->foreign('student_id')->references('id')->on('students');
            $table->foreign('group_id')->references('id')->on('groups');
            $table->foreign("created_by")->references("id")->on("admins");
            
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('registrations');
    }
};
