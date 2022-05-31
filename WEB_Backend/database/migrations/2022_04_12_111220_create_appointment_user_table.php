<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAppointmentUserTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('appointment_user', function (Blueprint $table) {
            $table->foreignId('user_id')->constrained()->onDelete("cascade");
            $table->foreignId('appointment_id')->constrained()->onDelete("cascade");
            $table->boolean('isAgreed')->default(false);
            $table->timestamps();
            $table->primary(['user_id', 'appointment_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('appointment_user');
    }
}
