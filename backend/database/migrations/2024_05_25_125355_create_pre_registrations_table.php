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
        Schema::create('pre_registrations', function (Blueprint $table) {
            $table->id();

            $table->string("fullname", 50);
            $table->string("email", 100)->nullable();
            $table->string("phone_number", 10)->nullable();
            $table->string("classe", 50);
            $table->string("address", 250)->nullable();
            $table->date("birthday");
            
            $table->string("parent_name", 50);
            $table->string("parent_phone_number", 10);
            $table->string("parenting_job", 50)->nullable();

            $table->boolean("validated")->default("false");

            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pre_registrations');
    }
};
