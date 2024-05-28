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
        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            
            $table->enum('day', [0, 1, 2, 3, 4, 5, 6]); // Example: 0 = Monday
            $table->time('starts_at'); // Example: 14:00
            $table->time('ends_at'); // Example: 15:00
            
            $table->unsignedBigInteger('group_subject_id'); // Example: 5
            $table->unsignedBigInteger('class_room_id'); // Example: 10
            
            $table->foreign('group_subject_id')->references('id')->on('group_subjects');
            $table->foreign('class_room_id')->references('id')->on('class_rooms');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('courses');
    }
};
