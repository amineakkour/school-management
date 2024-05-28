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
        Schema::create('exams', function (Blueprint $table) {
            $table->id();

            $table->string("title");
            $table->unsignedTinyInteger("max_grade");
            $table->text("document_url")->nullable();
            $table->string("version", 1); //viriant
            $table->string("versions_number", 1); 
            $table->unsignedTinyInteger("school_year");
            $table->enum("quarter", [1, 2, 3]);

            $table->unsignedBigInteger("group_subject_id");

            $table->foreign("group_subject_id")->references("id")->on("group_subjects");

            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('exams');
    }
};
