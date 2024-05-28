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
        Schema::create('groups', function (Blueprint $table) {
            $table->id();
            $table->unsignedTinyInteger("group_number"); //Ex: 1
            $table->unsignedTinyInteger("students_count");
            $table->unsignedTinyInteger("max_students_count");
            $table->enum("class", ["preschool", "primary", "junior_high_school", "high_school"]);
            $table->enum("level", [0, 1, 2, 4]); //Ex: 0 => premiere annee

            $table->unsignedBigInteger("speciality_id");
            
            $table->foreign("speciality_id")->references("id")->on("specialities");

            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('groups');
    }
};
