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
    Schema::create('todos', function (Blueprint $table) {
        $table->id(); // Ini otomatis jadi Primary Key (ID)
        $table->string('item'); // Kolom untuk isi tugas/kegiatan
        $table->boolean('is_don')->default(false); // Status: sudah selesai (1) atau belum (0)
        $table->timestamps(); // Otomatis buat kolom 'created_at' dan 'updated_at'
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('todos');
    }
};
