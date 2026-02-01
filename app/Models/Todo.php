<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
    // Memberi izin kolom mana saja yang boleh diisi secara massal
    protected $fillable = ['item', 'is_done']; 
}