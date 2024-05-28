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
        Schema::create('students', function (Blueprint $table) {
            $table->id();

            $table->string("first_name", 20);
            $table->string("last_name", 20);
            $table->string("email", 100)->unique();
            $table->string("phone_number", 10)->nullable();
            $table->string("password");
            $table->string("cin", 10)->unique()->nullable();
            $table->string("address");
            $table->date("birthday");
            $table->string("photo")->nullable();
            $table->enum("blood_type", ["A-", "A+", "B-", "B+", "AB+", "AB-", "O+", "O-"])->nullable();
            $table->enum("gender", ["m", "f"]);
            $table->timestamp("last_seen")->nullable();
            $table->boolean("has_disability")->default(false);
            $table->string("disability_type", 50)->nullable();
            $table->string("parent_full_name", 50);
            $table->string("parent_phone_number", 10);
            $table->enum("parent_blood_type", ["A-", "A+", "B-", "B+", "AB+", "AB-", "O+", "PO-"])->nullable();
            
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};
