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
            $table->string("email", 100)->unique();
            $table->string("phone_number", 10)->unique();
            $table->date("birthday");
            $table->string("password");
            $table->string("cin", 10)->unique();
            $table->string("address");
            $table->string("photo")->nullable();
            $table->enum("blood_type", ["A-", "A+", "B-", "B+", "AB+", "AB-", "O+", "O-"])->nullable();
            $table->enum("gender", ["m", "f"]);
            $table->date("hire_date");
            $table->timestamp("last_seen");
            $table->boolean("has_disability")->default(false);
            $table->string("disability_type", 50)->nullable();
            
            $table->softDeletes();
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
