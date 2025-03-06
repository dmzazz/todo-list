# **To-Do List App**

## 📌 **Deskripsi Proyek**
Aplikasi **To-Do List** ini dibuat menggunakan **HTML, JavaScript, dan Tailwind CSS**.
Aplikasi ini memungkinkan pengguna untuk menambahkan, mengedit, menyelesaikan, dan menghapus tugas-tugas mereka dengan tampilan yang responsif dan interaktif.

## 📂 **Struktur Proyek**

```
📁 to-do-list-app
│── 📂 css
│   └── style.css
│── 📂 js
│   └── script.js
│── 📂 images
│   └── bg.jpg
│── index.html
│── README.md
```

- **index.html** → Struktur utama halaman.
- **css/style.css** → File untuk styling tambahan.
- **js/script.js** → File untuk menangani logika aplikasi.
- **images/bg.jpg** → Gambar latar belakang untuk tampilan aplikasi.
- **README.md** → Dokumentasi proyek.

## 🚀 **Teknologi yang Digunakan**
- **HTML** → Untuk struktur halaman.
- **JavaScript (JS)** → Untuk mengelola tugas-tugas (CRUD) menggunakan `localStorage`.
- **Tailwind CSS** → Untuk styling dengan CDN.

## 🎨 **Fitur Utama**
✅ Tambah tugas dengan judul, deskripsi, dan tanggal jatuh tempo.
✅ Tandai tugas sebagai selesai.
✅ Edit tugas yang telah dibuat.
✅ Hapus tugas yang tidak diperlukan.
✅ Filter tugas berdasarkan status: **All, Pending, Completed**.
✅ Mode **Dark Mode** otomatis dengan Tailwind CSS.
✅ Data tersimpan di **localStorage** agar tidak hilang saat merefresh halaman.

## 🔧 **Cara Menggunakan**
1. **Clone repository** ini atau download file ZIP.
   ```sh
   git clone https://github.com/username/to-do-list-app.git
   ```
2. **Buka file `index.html`** di browser favorit Anda.
3. **Gunakan aplikasi** dengan menambahkan tugas baru dan mengelola daftar tugas.

## 🖥️ **Kode Utama**
Berikut adalah contoh struktur utama HTML dalam proyek ini:

```html
<div class="w-full px-4 h-[330px] no-scrollbar overflow-y-auto">
    <ul class="list-item" id="displayTask">
        <!-- Tasks will be displayed here dynamically -->
    </ul>
</div>
```

Contoh kode JavaScript untuk menambahkan tugas:

```js
const addTask = (e) => {
  e.preventDefault();

  const title = titleInput.value;
  const description = descriptionInput.value;
  const date = dateInput.value;

  if (title.trim() === "" || description.trim() === "" || date === "") {
    alert("Field cannot be null");
  } else {
    const id = generatorId();
    const task = { id, title, description, date, completed: false };
    localStorage.setItem(id, JSON.stringify(task));
  }
  displayTasks();
};
```

## 📜 **Lisensi**
Proyek ini dibuat untuk tujuan belajar dan bebas digunakan sesuai kebutuhan. 😊

## ✨ **Kontribusi**
Ingin berkontribusi? Silakan **fork** repository ini, buat perubahan, dan lakukan **pull request**!

---
💡 Dibuat dengan ❤️ oleh **Dimas Azizir**

