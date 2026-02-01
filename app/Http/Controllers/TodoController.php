<?php

namespace App\Http\Controllers;

use App\Models\Todo; // Mengambil model Todo agar bisa akses database
use Illuminate\Http\Request;

class TodoController extends Controller
{
    // Fungsi untuk menampilkan semua data (READ)
    public function index()
    {
        return Todo::all(); // Mengambil semua data dari tabel todos
    }

    // Fungsi untuk menyimpan data baru (CREATE)
    public function store(Request $request)
    {
        // Validasi: Memastikan 'item' tidak kosong
        $validated = $request->validate([
            'item' => 'required|string'
        ]);

        // Simpan ke database
        $todo = Todo::create($validated);

        return response()->json([
            'message' => 'Tugas berhasil ditambah!',
            'data' => $todo
        ], 201);
    }
}