<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSongFilesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('song_files', function (Blueprint $table) {
            $table->increments('id');
            $table->string('original_name');
            $table->string('path');
            $table->integer('process_status')->default(0);
            $table->longText('meta')->nullable();
            $table->integer('song_id')->unsigend()->nullable();
            $table->integer('user_id')->unsigend();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('song_files');
    }
}
