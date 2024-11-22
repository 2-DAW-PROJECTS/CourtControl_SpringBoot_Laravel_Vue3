<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLessonsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('lessons', function (Blueprint $table) {
            $table->id();
            $table->string('name_class');
            $table->boolean('is_active')->default(1);
            $table->integer('vacancies')->nullable();
            $table->string('days'); // L-M-X, etc.
            $table->time('time'); // Hora de inicio
            $table->time('duration')->nullable(); // Duración en formato HH:MM
            $table->decimal('base_cost', 8, 2); // Coste base con dos decimales
            $table->string('level')->nullable(); // Beginner, Intermediate, Advanced
            $table->string('coach')->nullable(); // Nombre del entrenador
            $table->integer('max_capacity')->nullable();
            $table->text('description')->nullable(); // Descripción de la clase
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
        Schema::dropIfExists('lessons');
    }
}
