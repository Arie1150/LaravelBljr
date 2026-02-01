import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  // State untuk menyimpan data dari database dan input user
  const [todos, setTodos] = useState([]); 
  const [item, setItem] = useState('');   

  // --- 1. READ (Menampilkan Data) ---
  const fetchTodos = () => {
    // Mengambil data dari endpoint API Laravel yang sudah kita buat
    axios.get('http://127.0.0.1:8000/api/todos')
      .then(res => {
        setTodos(res.data);
      })
      .catch(err => console.log("Gagal ambil data:", err));
  };

  // useEffect memastikan data dipanggil otomatis saat halaman pertama kali dibuka
  useEffect(() => {
    fetchTodos();
  }, []);

  // --- 2. CREATE (Tambah Data) ---
  const tambahTugas = (e) => {
    e.preventDefault(); // Mencegah reload halaman
    if (!item) return;  // Validasi sederhana agar tidak input kosong

    axios.post('http://127.0.0.1:8000/api/todos', { item: item })
      .then(() => {
        setItem('');   // Kosongkan kotak input setelah berhasil
        fetchTodos();  // Panggil ulang daftar agar data baru muncul
      })
      .catch(err => console.log("Gagal tambah:", err));
  };

  // --- 3. UPDATE (Ubah Status Selesai) ---
  const toggleSelesai = (id) => {
    // Mengirim permintaan PUT ke Laravel untuk mengubah status is_done
    axios.put(`http://127.0.0.1:8000/api/todos/${id}`)
      .then(() => {
        fetchTodos(); // Refresh tampilan
      })
      .catch(err => console.log("Gagal update:", err));
  };

  // --- 4. DELETE (Hapus Data) ---
  const hapusTugas = (id) => {
    if (window.confirm("Yakin ingin menghapus tugas ini?")) {
      axios.delete(`http://127.0.0.1:8000/api/todos/${id}`)
        .then(() => {
          fetchTodos(); // Refresh tampilan setelah dihapus
        })
        .catch(err => console.log("Gagal hapus:", err));
    }
  };

  // Tampilan Utama (UI)
  return (
    <div style={{ 
      padding: '50px', 
      fontFamily: 'Segoe UI, sans-serif', 
      maxWidth: '500px', 
      margin: '0 auto' 
    }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Latihan CRUD - Fullstack</h1>
      
      {/* Form Input Tugas Baru */}
      <form onSubmit={tambahTugas} style={{ marginBottom: '30px', display: 'flex' }}>
        <input 
          type="text" 
          value={item} 
          onChange={(e) => setItem(e.target.value)} 
          placeholder="Tulis tugas baru di sini..."
          style={{ 
            flex: 1, 
            padding: '12px', 
            borderRadius: '5px 0 0 5px', 
            border: '1px solid #ddd',
            outline: 'none'
          }}
        />
        <button type="submit" style={{ 
          padding: '12px 20px', 
          backgroundColor: '#28a745', 
          color: 'white', 
          border: 'none', 
          borderRadius: '0 5px 5px 0', 
          cursor: 'pointer' 
        }}>
          Tambah
        </button>
      </form>

      {/* Daftar Tugas */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map(t => (
          <li key={t.id} style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            padding: '15px',
            marginBottom: '10px',
            borderRadius: '8px',
            backgroundColor: t.is_done ? '#f8f9fa' : '#ffffff',
            border: '1px solid #eee',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
          }}>
            <span 
              onClick={() => toggleSelesai(t.id)}
              style={{ 
                cursor: 'pointer',
                flex: 1,
                textDecoration: t.is_done ? 'line-through' : 'none',
                color: t.is_done ? '#888' : '#333'
              }}
            >
              {t.item}
            </span>
            
            <button 
              onClick={() => hapusTugas(t.id)}
              style={{ 
                padding: '6px 12px', 
                backgroundColor: '#dc3545', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px', 
                cursor: 'pointer',
                fontSize: '12px'
              }}
            >
              Hapus
            </button>
          </li>
        ))}
      </ul>
      
      {todos.length === 0 && <p style={{ textAlign: 'center', color: '#999' }}>Belum ada tugas.</p>}
    </div>
  );
}

export default App;