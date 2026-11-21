export const contact = {
  instagram: 'Rumbelmilenialcendekia.id',
  instagramUrl: 'https://instagram.com/Rumbelmilenialcendekia.id',
  website: 'rumbelalfath.wordpress.com',
  websiteUrl: 'https://rumbelalfath.wordpress.com/',
  phone: '0857-7671-4534',
  whatsapp: '6285776714534',
  address: 'Jl. Simagalih IV, Cinangka, Sawangan, Kota Depok, Jawa Barat',
}

export const navLinks = [
  { href: '/#tentang', label: 'Tentang' },
  { href: '/#visi-misi', label: 'Visi & Misi' },
  { href: '/#program', label: 'Program' },
  { href: '/#kegiatan', label: 'Kegiatan' },
  { href: '/#kontak', label: 'Kontak' },
]

export const missions = [
  'Menyediakan pendidikan berkualitas untuk anak usia 6–15 tahun, dengan fokus pada pembelajaran yang menyenangkan dan interaktif.',
  'Mengembangkan program pendidikan yang inklusif, mendorong kepekaan sosial, dan menanamkan nilai kepedulian terhadap lingkungan.',
  'Melaksanakan program kesehatan dan gizi untuk mendukung pertumbuhan dan perkembangan anak yang optimal.',
  'Membangun kerja sama dengan pemerintah, swasta, dan komunitas untuk meningkatkan akses pendidikan dan kesehatan bagi masyarakat.',
  'Melakukan penelitian dan pengembangan metode pembelajaran inovatif untuk meningkatkan kualitas pendidikan.',
]

export const classSchedule = {
  days: 'Senin – Kamis',
  classes: [
    { name: 'Kelas A', time: '15.30 – selesai WIB' },
    { name: 'Kelas B', time: '18.30 – selesai WIB' },
  ],
  subjects: [
    'Tahsin',
    'Tahfidz Juz 30',
    'English / Bahasa Inggris',
    'Arabic / Bahasa Arab',
    'Public Speaking',
  ],
}

export type Program = {
  id: string
  title: string
  tag: string
  period: string
  description: string
  image: string
}

export const programs: Program[] = [
  {
    id: 'literasi',
    title: 'Peduli Pendidikan & Literasi',
    tag: 'Pendidikan',
    period: '2020 – sekarang',
    description:
      'Meningkatkan mutu pendidikan dan literasi di sekitar rumah belajar melalui public speaking, pengetahuan agama maupun umum, dan metode fun learning: film edukasi, rewards, hingga rekreasi.',
    image: 'kelas-literasi.jpg',
  },
  {
    id: 'kesehatan',
    title: 'Peduli Kesehatan Masyarakat',
    tag: 'Kesehatan',
    period: '2021 – sekarang',
    description:
      'Sosialisasi kesehatan, cek kesehatan gratis, dan berobat gratis bersama komunitas tenaga kesehatan, kampus, BUMN, dan swasta. Dicanangkan sebagai program tahunan.',
    image: 'cek-kesehatan.jpg',
  },
  {
    id: 'road-to-school',
    title: 'Road to School',
    tag: 'Kepemimpinan',
    period: '2023 – sekarang',
    description:
      'Leadership training bersama SMPT Baitul Hikmah Depok untuk membentuk jiwa kepemimpinan dan soft skill siswa menghadapi tantangan dunia disrupsi.',
    image: 'road-to-school.jpg',
  },
  {
    id: 'phbi',
    title: 'Pendidikan Agama (PHBI)',
    tag: 'Agama',
    period: '2021 – sekarang',
    description:
      'Peringatan Hari Besar Islam setiap tahun dengan menghadirkan tokoh agama berkompeten, mendorong semangat menuntut ilmu, dan memberi apresiasi atas capaian belajar anak.',
    image: 'maulid-2023.jpg',
  },
]

export type Activity = {
  year: string
  title: string
  partner: string
  description: string
  image: string
  category: 'Pendidikan' | 'Kesehatan' | 'Agama' | 'Kolaborasi'
}

export const activities: Activity[] = [
  {
    year: '2020',
    title: 'Fun Learning & Kelas A–B',
    partner: 'Rumah Belajar',
    description:
      'Kelas rutin Senin–Kamis: tahsin, tahfidz, English, Arabic, dan public speaking dengan suasana belajar yang menyenangkan.',
    image: 'fun-learning.jpg',
    category: 'Pendidikan',
  },
  {
    year: '2021',
    title: 'Workshop Literasi PKM UNPAM',
    partner: 'Mahasiswa Universitas Pamulang',
    description:
      'Workshop interaktif bersama mahasiswa PKM untuk meningkatkan minat literasi anak-anak.',
    image: 'pkm-unpam.jpg',
    category: 'Kolaborasi',
  },
  {
    year: '2021',
    title: 'Pengabdian Masyarakat & Cek Kesehatan',
    partner: 'Komunitas Nurse Tingle',
    description:
      'Sosialisasi kesehatan, cek kesehatan, dan berobat gratis — mengabdi tiada henti meskipun di saat pandemi.',
    image: 'nurse-tingle.jpg',
    category: 'Kesehatan',
  },
  {
    year: '2021',
    title: 'Maulid Nabi Muhammad SAW 1442 H',
    partner: 'Bersama Ustadz Achmad Yani Hadi',
    description:
      'Motivasi menuntut ilmu dan apresiasi capaian belajar santri cilik rumah belajar.',
    image: 'maulid-2021.jpg',
    category: 'Agama',
  },
  {
    year: '2023',
    title: 'Peduli Sesama, Berbagi Kasih',
    partner: 'HIMA S2 Manajemen UPNVJ',
    description:
      'Cek kesehatan dan berobat gratis didukung BUMN, perusahaan swasta, dan LKMI.',
    image: 'cek-kesehatan.jpg',
    category: 'Kesehatan',
  },
  {
    year: '2023',
    title: 'Tabligh Akbar & Maulid Nabi',
    partner: 'KH Dr. Asep Kamaluddin N.',
    description:
      'Kajian bersama tokoh agama yang dekat dengan generasi muda di lingkungan Cinangka.',
    image: 'tabligh-akbar.jpg',
    category: 'Agama',
  },
  {
    year: '2025',
    title: 'Road to School #3',
    partner: 'SMPT Baitul Hikmah Depok',
    description:
      'Leadership training "Transformasi Kepemimpinan Remaja dalam Tantangan Dunia Disrupsi AI".',
    image: 'road-to-school.jpg',
    category: 'Pendidikan',
  },
]

export const partners = [
  'Universitas Pamulang',
  'UPN Veteran Jakarta',
  'SMPT Baitul Hikmah Depok',
  'Komunitas Nurse Tingle',
  'STIKes Widya Dharma Husada',
  'SDI Al Falah Bogor',
  'Yayasan Alkamila Depok',
  'Jasa Raharja Putera',
  'LKMI',
]

export const collaborations = [
  {
    title: 'Sekolah & Kampus',
    description:
      'Road to School, kelas tematik, seminar literasi, PHBI, dan coaching kepemimpinan siswa.',
  },
  {
    title: 'Komunitas & LSM',
    description:
      'Cek kesehatan, edukasi gizi, kebersihan, webinar literasi, dan kampanye lingkungan.',
  },
  {
    title: 'Perusahaan & Sponsor',
    description:
      'Program CSR, beasiswa, peralatan belajar, dan dukungan acara pendidikan.',
  },
]
