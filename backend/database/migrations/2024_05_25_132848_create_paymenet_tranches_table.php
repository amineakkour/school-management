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
        Schema::create('paymenet_tranches', function (Blueprint $table) {
            $table->id();
            
            $table->enum("payment_method", ["check", "transfer", "cash", "card", "terminal"]);
            $table->timestamp("verified_at")->nullable();
            $table->unsignedBigInteger("registration_id");

            $table->foreign("registration_id")->references('id')->on('registrations');
            
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('paymenet_tranches');
    }
};
