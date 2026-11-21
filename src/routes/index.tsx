import { useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import {
  ArrowRight,
  AtSign,
  BookOpen,
  Calendar,
  Clock,
  Gamepad2,
  GraduationCap,
  Globe,
  Handshake,
  HeartPulse,
  MapPin,
  Moon,
  Phone,
  Puzzle,
  Send,
  Shuffle,
  Sparkles,
  Star,
} from 'lucide-react'

import { SiteHeader } from '@/components/site/site-header'
import { SiteFooter } from '@/components/site/site-footer'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  activities,
  classSchedule,
  collaborations,
  contact,
  missions,
  partners,
  programs,
} from '@/data/site'
import { cdnImg } from '@/lib/image'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/')({
  component: Home,
})

const programIcons = {
  literasi: BookOpen,
  kesehatan: HeartPulse,
  'road-to-school': GraduationCap,
  phbi: Moon,
} as const

function SectionHeading({
  eyebrow,
  title,
  lead,
  center,
}: {
  eyebrow: string
  title: string
  lead?: string
  center?: boolean
}) {
  return (
    <div className={cn('mb-10 max-w-2xl', center && 'mx-auto text-center')}>
      <span className="text-xs font-bold uppercase tracking-[0.25em] text-primary">
        {eyebrow}
      </span>
      <h2 className="mt-2 text-4xl font-extrabold uppercase leading-none text-navy md:text-5xl">
        {title}
      </h2>
      {lead && (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
          {lead}
        </p>
      )}
    </div>
  )
}

function Home() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main>
        <Hero />
        <About />
        <VisionMission />
        <Programs />
        <GamesTeaser />
        <Timeline />
        <Collaborate />
        <Contact />
      </main>
      <SiteFooter />
    </div>
  )
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="bg-dots absolute inset-y-0 right-0 hidden w-1/2 opacity-60 md:block" />
      <div className="relative mx-auto grid max-w-content items-center gap-12 px-4 py-14 md:grid-cols-[1.1fr_1fr] md:py-20">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
            <MapPin className="size-3.5" /> Berdiri 10 Agustus 2020 · Cinangka,
            Depok
          </span>
          <h1 className="mt-5 text-5xl font-extrabold uppercase leading-[0.95] text-navy md:text-7xl">
            Ruang belajar inklusif untuk
            <span className="block text-primary">generasi cerdas</span>
            <span className="block">& berakhlak</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Komunitas pendidikan non-formal yang bergerak di bidang
            pembelajaran, kegiatan sosial, dan kepedulian kesehatan — menguatkan
            iman, ilmu, dan karakter siswa SD/MI, SMP/MTs, hingga SMA/MA.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="#program"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-bold text-primary-foreground shadow-md shadow-primary/25 transition-transform hover:-translate-y-0.5"
            >
              Lihat Program <ArrowRight className="size-4" />
            </a>
            <Link
              to="/games"
              className="inline-flex items-center gap-2 rounded-full border-2 border-navy/15 bg-card px-6 py-3 font-bold text-navy transition-colors hover:border-primary hover:text-primary"
            >
              <Gamepad2 className="size-4" /> Main English Games
            </Link>
          </div>
          <dl className="mt-10 grid max-w-lg grid-cols-3 gap-3">
            {[
              { k: '2020', v: 'Tahun berdiri' },
              { k: '4', v: 'Program utama' },
              { k: '9+', v: 'Mitra kolaborasi' },
            ].map((s) => (
              <div
                key={s.v}
                className="rounded-2xl border border-border bg-card px-4 py-3"
              >
                <dt className="font-display text-3xl font-extrabold text-primary">
                  {s.k}
                </dt>
                <dd className="text-xs font-medium text-muted-foreground">
                  {s.v}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-md md:max-w-none">
          <div className="grid grid-cols-5 grid-rows-[auto_auto] gap-3">
            <img
              src={cdnImg('kelas-literasi.jpg', 900)}
              alt="Santri rumah belajar berfoto bersama membawa hadiah buku"
              className="col-span-5 aspect-[16/10] w-full rounded-3xl object-cover shadow-xl shadow-navy/15"
              width={900}
              height={560}
            />
            <img
              src={cdnImg('rekreasi.jpg', 500)}
              alt="Anak-anak rumah belajar rekreasi edukatif di kolam renang"
              className="col-span-2 aspect-square w-full rounded-3xl object-cover"
              width={400}
              height={400}
              loading="lazy"
            />
            <div className="bg-brand-gradient col-span-3 flex flex-col justify-between rounded-3xl p-5 text-primary-foreground">
              <Sparkles className="size-6 text-accent" />
              <p className="font-display text-2xl font-bold uppercase leading-tight">
                Iman · Ilmu · Akhlak · Kesehatan
              </p>
              <p className="text-xs opacity-80">Daring & luring sejak 2020</p>
            </div>
          </div>
          <div className="absolute -left-4 top-6 hidden rotate-[-4deg] rounded-2xl bg-accent px-4 py-2 font-display text-lg font-bold uppercase text-accent-foreground shadow-lg md:block">
            Fun Learning!
          </div>
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="tentang" className="scroll-mt-20 bg-secondary/50 py-16 md:py-24">
      <div className="mx-auto grid max-w-content items-center gap-12 px-4 md:grid-cols-2">
        <div className="relative">
          <img
            src={cdnImg('fun-learning.jpg', 900)}
            alt="Kegiatan belajar di kelas rumah belajar"
            className="aspect-[4/3] w-full rounded-3xl object-cover shadow-lg"
            loading="lazy"
            width={900}
            height={675}
          />
          <img
            src="/img/logo.jpg"
            alt="Logo Rumah Belajar Milenial Cendekia"
            className="absolute -bottom-6 -right-4 w-28 rounded-2xl border-4 border-background bg-white p-2 shadow-lg md:w-36"
            loading="lazy"
            width={144}
            height={141}
          />
        </div>
        <div>
          <SectionHeading
            eyebrow="Latar Belakang"
            title="Tumbuh dari kepedulian di masa pandemi"
          />
          <div className="space-y-4 leading-relaxed text-foreground/80">
            <p>
              Rumah Belajar Milenial Cendekia berdiri sebagai respons terhadap
              tantangan pembelajaran daring selama pandemi Covid-19. Banyak
              orang tua harus menjalani peran ganda — pencari nafkah, pengasuh,
              sekaligus pendamping belajar — sementara siswa membutuhkan
              bimbingan dan akses informasi yang terarah.
            </p>
            <p>
              Kami hadir menjembatani kebutuhan itu melalui program belajar yang
              inklusif, menyenangkan, dan aman secara digital.
            </p>
          </div>
          <div className="mt-6 rounded-2xl border border-border bg-card p-5">
            <div className="flex items-center gap-2 font-display text-xl font-bold uppercase text-navy">
              <Calendar className="size-5 text-primary" /> Jadwal Kelas A & B
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              {classSchedule.days}
            </p>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {classSchedule.classes.map((c) => (
                <div key={c.name} className="rounded-xl bg-secondary px-3 py-2">
                  <div className="text-sm font-bold text-secondary-foreground">
                    {c.name}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="size-3" /> {c.time}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {classSchedule.subjects.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-primary/25 px-3 py-1 text-xs font-semibold text-primary"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function VisionMission() {
  return (
    <section id="visi-misi" className="scroll-mt-20 py-16 md:py-24">
      <div className="mx-auto max-w-content px-4">
        <SectionHeading eyebrow="Arah Kami" title="Visi & Misi" />
        <div className="grid gap-6 lg:grid-cols-[1fr_1.6fr]">
          <div className="bg-brand-gradient relative overflow-hidden rounded-3xl p-8 text-primary-foreground">
            <Star className="size-8 text-accent" />
            <h3 className="mt-4 text-3xl font-extrabold uppercase">Visi</h3>
            <p className="mt-3 text-lg leading-relaxed opacity-95">
              Menjadi wadah pendidikan non-formal terdepan yang mencetak
              generasi muda cerdas, kreatif, berkepekaan sosial dan kesehatan
              tinggi, serta berkontribusi bagi bangsa.
            </p>
            <img
              src="/img/logo-icon.png"
              alt=""
              className="absolute -bottom-6 -right-6 w-40 opacity-15 brightness-0 invert"
            />
          </div>
          <div className="rounded-3xl bg-teal p-8 text-primary-foreground">
            <h3 className="text-3xl font-extrabold uppercase">Misi Kami</h3>
            <ol className="mt-4 space-y-3">
              {missions.map((m, i) => (
                <li key={m} className="flex gap-4">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-white/20 font-display text-lg font-bold">
                    {i + 1}
                  </span>
                  <span className="leading-relaxed">{m}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}

function Programs() {
  return (
    <section
      id="program"
      className="scroll-mt-20 bg-secondary/50 py-16 md:py-24"
    >
      <div className="mx-auto max-w-content px-4">
        <SectionHeading
          eyebrow="Berikut Kegiatan Kami"
          title="Program Utama"
          lead="Empat pilar program yang berjalan berkelanjutan bersama warga, sekolah, kampus, dan komunitas."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {programs.map((p) => {
            const Icon = programIcons[p.id as keyof typeof programIcons]
            return (
              <article
                key={p.id}
                className="group overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-shadow hover:shadow-lg"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img
                    src={cdnImg(p.image, 800)}
                    alt={p.title}
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    width={800}
                    height={450}
                  />
                  <span className="bg-brand-gradient absolute right-4 top-4 rounded-xl px-3 py-1.5 font-display text-sm font-bold text-primary-foreground shadow">
                    {p.period}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3">
                    <span className="grid size-10 place-items-center rounded-xl bg-secondary text-primary">
                      <Icon className="size-5" />
                    </span>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                        {p.tag}
                      </div>
                      <h3 className="text-2xl font-extrabold uppercase leading-tight text-navy">
                        {p.title}
                      </h3>
                    </div>
                  </div>
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    {p.description}
                  </p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function GamesTeaser() {
  const items = [
    { icon: Sparkles, label: 'Kuis Pilihan Ganda' },
    { icon: Shuffle, label: 'Susun Kata' },
    { icon: BookOpen, label: 'Isi Titik-titik' },
    { icon: Puzzle, label: 'Cocokkan Kata' },
  ]
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-content px-4">
        <div className="bg-brand-gradient relative overflow-hidden rounded-[2rem] px-6 py-12 text-primary-foreground md:px-12">
          <div className="bg-dots absolute inset-0 opacity-30" />
          <div className="relative grid items-center gap-10 md:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent-foreground">
                <Gamepad2 className="size-3.5" /> Baru
              </span>
              <h2 className="mt-4 text-4xl font-extrabold uppercase leading-none md:text-6xl">
                English Games
              </h2>
              <p className="mt-4 max-w-md text-lg leading-relaxed opacity-90">
                Belajar Bahasa Inggris sambil bermain. Soal untuk SD, SMP, dan
                SMA — bisa dimainkan sendiri atau beregu di kelas lewat
                proyektor. Guru juga bisa membuat kuis sendiri dan membagikan
                tautannya.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/games"
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-bold text-accent-foreground shadow-lg transition-transform hover:-translate-y-0.5"
                >
                  Mulai Bermain <ArrowRight className="size-4" />
                </Link>
                <Link
                  to="/games/buat"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-white/40 px-6 py-3 font-bold transition-colors hover:bg-white/10"
                >
                  Buat Kuis untuk Kelas
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {items.map(({ icon: Icon, label }, i) => (
                <div
                  key={label}
                  className={cn(
                    'rounded-2xl bg-white/12 p-5 backdrop-blur ring-1 ring-white/20',
                    i % 2 === 1 && 'translate-y-4',
                  )}
                >
                  <Icon className="size-7 text-accent" />
                  <div className="mt-3 font-display text-xl font-bold uppercase">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const categoryStyle: Record<string, string> = {
  Pendidikan: 'bg-secondary text-secondary-foreground',
  Kesehatan: 'bg-success/15 text-success',
  Agama: 'bg-accent/30 text-accent-foreground',
  Kolaborasi: 'bg-teal/15 text-teal',
}

function Timeline() {
  const filters = ['Semua', 'Pendidikan', 'Kesehatan', 'Agama', 'Kolaborasi']
  const [filter, setFilter] = useState('Semua')
  const shown =
    filter === 'Semua'
      ? activities
      : activities.filter((a) => a.category === filter)
  return (
    <section
      id="kegiatan"
      className="scroll-mt-20 bg-secondary/50 py-16 md:py-24"
    >
      <div className="mx-auto max-w-content px-4">
        <SectionHeading
          eyebrow="Jejak Langkah"
          title="Linimasa Kegiatan"
          lead="Dokumentasi kegiatan kami dari tahun ke tahun bersama para mitra."
        />
        <div className="mb-8 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={cn(
                'rounded-full px-4 py-2 text-sm font-semibold transition-colors',
                filter === f
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card text-foreground/70 hover:text-primary',
              )}
            >
              {f}
            </button>
          ))}
        </div>
        <ol className="relative space-y-8 border-l-2 border-primary/25 pl-6 md:pl-10">
          {shown.map((a) => (
            <li
              key={a.title}
              className="relative grid gap-5 rounded-3xl border border-border bg-card p-4 md:grid-cols-[260px_1fr] md:p-5"
            >
              <span className="absolute -left-[33px] top-6 size-4 rounded-full border-4 border-background bg-primary md:-left-[49px]" />
              <img
                src={cdnImg(a.image, 560)}
                alt={a.title}
                className="aspect-[4/3] w-full rounded-2xl object-cover"
                loading="lazy"
                width={520}
                height={390}
              />
              <div className="flex flex-col justify-center">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-display text-3xl font-extrabold text-primary">
                    {a.year}
                  </span>
                  <span
                    className={cn(
                      'rounded-full px-2.5 py-0.5 text-xs font-bold',
                      categoryStyle[a.category],
                    )}
                  >
                    {a.category}
                  </span>
                </div>
                <h3 className="mt-1 text-2xl font-extrabold uppercase leading-tight text-navy">
                  {a.title}
                </h3>
                <p className="text-sm font-semibold text-primary">
                  {a.partner}
                </p>
                <p className="mt-2 leading-relaxed text-muted-foreground">
                  {a.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Collaborate() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-content px-4">
        <SectionHeading
          eyebrow="Ayo Kolaborasi"
          title="Tumbuh bersama mitra"
          lead="Kemitraan program pendidikan, kesehatan, dan penguatan karakter di sekolah, kampus, dan komunitas."
          center
        />
        <div className="grid gap-6 md:grid-cols-3">
          {collaborations.map((c) => (
            <div
              key={c.title}
              className="rounded-3xl border border-border bg-card p-6"
            >
              <Handshake className="size-8 text-primary" />
              <h3 className="mt-4 text-2xl font-extrabold uppercase text-navy">
                {c.title}
              </h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                {c.description}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {partners.map((p) => (
            <span
              key={p}
              className="rounded-full border border-border bg-secondary/60 px-4 py-2 text-sm font-semibold text-secondary-foreground"
            >
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const [form, setForm] = useState({
    nama: '',
    jenjang: '',
    program: '',
    pesan: '',
  })
  const update =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }))

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const text = `Assalamu'alaikum, saya ${form.nama} – ${form.jenjang} – ${form.program}.\n${form.pesan}`
    window.open(
      `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(text)}`,
      '_blank',
      'noopener',
    )
  }

  const selectClass =
    'h-11 w-full rounded-xl border border-input bg-card px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring'

  return (
    <section id="kontak" className="scroll-mt-20 bg-secondary/50 py-16 md:py-24">
      <div className="mx-auto grid max-w-content gap-8 px-4 md:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="Kontak & Pendaftaran"
            title="Mari bergabung"
            lead="Tanyakan program, jadwal kelas, atau ajukan kerja sama. Kami senang mendengar dari Anda."
          />
          <ul className="space-y-3">
            {[
              {
                icon: AtSign,
                label: `@${contact.instagram}`,
                href: contact.instagramUrl,
              },
              { icon: Globe, label: contact.website, href: contact.websiteUrl },
              {
                icon: Phone,
                label: contact.phone,
                href: `https://wa.me/${contact.whatsapp}`,
              },
              { icon: MapPin, label: contact.address },
            ].map(({ icon: Icon, label, href }) => (
              <li key={label}>
                {href ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 rounded-2xl bg-card px-4 py-3 font-semibold transition-colors hover:text-primary"
                  >
                    <Icon className="size-5 text-primary" /> {label}
                  </a>
                ) : (
                  <div className="flex items-center gap-3 rounded-2xl bg-card px-4 py-3 font-semibold">
                    <Icon className="size-5 shrink-0 text-primary" /> {label}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
        <form
          onSubmit={onSubmit}
          className="self-start rounded-3xl border border-border bg-card p-6 shadow-sm md:p-8"
        >
          <h3 className="text-2xl font-extrabold uppercase text-navy">
            Daftar via WhatsApp
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Isi formulir, lalu pesan Anda langsung terkirim ke WhatsApp admin.
          </p>
          <div className="mt-5 grid gap-4">
            <Input
              required
              placeholder="Nama lengkap"
              value={form.nama}
              onChange={update('nama')}
              className="h-11 rounded-xl"
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <select
                required
                value={form.jenjang}
                onChange={update('jenjang')}
                className={selectClass}
                aria-label="Jenjang"
              >
                <option value="">Pilih jenjang</option>
                <option>SD/MI</option>
                <option>SMP/MTs</option>
                <option>SMA/MA</option>
                <option>Mitra / Kolaborasi</option>
              </select>
              <select
                required
                value={form.program}
                onChange={update('program')}
                className={selectClass}
                aria-label="Program"
              >
                <option value="">Pilih program</option>
                <option>Kelas A (sore)</option>
                <option>Kelas B (malam)</option>
                {programs.map((p) => (
                  <option key={p.id}>{p.title}</option>
                ))}
              </select>
            </div>
            <Textarea
              rows={4}
              placeholder="Pesan atau pertanyaan"
              value={form.pesan}
              onChange={update('pesan')}
              className="rounded-xl"
            />
            <button
              type="submit"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary font-bold text-primary-foreground shadow-md shadow-primary/25 transition-transform hover:-translate-y-0.5"
            >
              <Send className="size-4" /> Kirim ke WhatsApp
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
