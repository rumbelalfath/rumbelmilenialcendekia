# Rumah Belajar Milenial Cendekia

Website resmi Rumah Belajar Milenial Cendekia — komunitas pendidikan non-formal di Cinangka, Depok yang bergerak di bidang pendidikan, sosial, dan kesehatan sejak 2020 — dilengkapi **English Games**, kumpulan permainan soal Bahasa Inggris untuk siswa SD, SMP, dan SMA.

## Fitur

- **Beranda**: profil, latar belakang, visi & misi, jadwal Kelas A & B, empat program utama, linimasa kegiatan (bisa difilter), mitra kolaborasi, dan formulir pendaftaran yang langsung terkirim ke WhatsApp admin.
- **English Games** (`/games`), tiap permainan tersedia untuk jenjang SD/MI, SMP/MTs, dan SMA/MA:
  - *Kuis Pilihan Ganda*: ada timer, bonus jawaban beruntun, penjelasan jawaban, dan **Mode Kelas** dua tim untuk dimainkan di proyektor.
  - *Susun Kata*: menyusun huruf acak menjadi kata.
  - *Isi Titik-titik*: melengkapi kalimat (tenses, preposisi, kosakata).
  - *Cocokkan Kata*: kartu memori Inggris ↔ Indonesia.
- **Buat Kuis untuk guru** (`/games/buat`): guru menyusun soal pilihan ganda sendiri, lalu membagikan tautannya lewat WhatsApp. Siswa bisa langsung bermain tanpa perlu akun.

## Teknologi

TanStack Start (React 19, Vite), Tailwind CSS 4, komponen shadcn/ui, ikon lucide-react, serta Netlify untuk hosting dan Image CDN.

## Menjalankan secara lokal

```bash
pnpm install
netlify dev        # atau: pnpm dev
```

## Mengubah konten

- Teks profil, program, dan kegiatan ada di `src/data/site.ts`.
- Bank soal Bahasa Inggris ada di `src/data/english-questions.ts`.
- Foto disimpan di `public/img/`.

## Pengembangan berikutnya (opsional)

- Menyimpan kuis guru dan papan skor kelas di Netlify Database.
- Akun guru (Netlify Identity) untuk mengelola banyak kuis.
- Galeri foto kegiatan yang lebih lengkap.
