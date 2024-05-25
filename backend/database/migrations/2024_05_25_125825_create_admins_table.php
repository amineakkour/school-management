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
        Schema::create('admins', function (Blueprint $table) {
            $table->id();

            $table->string("first_name", 20);
            $table->string("last_name", 20);
            $table->string("email", 100);
            $table->string("phone_number", 10);
            $table->date("birthday");
            $table->string("password");
            $table->string("cin", 10)->nullable();
            $table->string("address");
            $table->string("photo")->nullable();
            $table->enum("blood_type", ["A-", "A+", "B-", "B+", "AB+", "AB-", "O+", "O-"])->nullable();
            $table->enum("gender", ["m", "f"]);
            $table->date("hire_date");
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('admins');
    }
};
