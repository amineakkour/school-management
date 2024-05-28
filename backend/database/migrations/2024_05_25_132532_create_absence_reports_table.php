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
        Schema::create('absence_reports', function (Blueprint $table) {
            $table->id();

            $table->string("reason", 100)->nullable();
            $table->unsignedTinyInteger("school_year");
            $table->enum("quarter", [1, 2, 3]);

            $table->unsignedBigInteger("student_id");
            $table->unsignedBigInteger("course_id");

            $table->foreign("student_id")->references('id')->on('students');
            $table->foreign("course_id")->references("id")->on("courses");

            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('absence_reports');
    }
};
