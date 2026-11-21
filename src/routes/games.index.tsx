import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRight, BookOpen, PenLine, Puzzle, Shuffle, Sparkles, Users } from 'lucide-react'

import { GamesLayout } from '@/components/games/games-layout'
import { levels } from '@/data/english-questions'
import { games, type GameId } from '@/data/games'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/games/')({
  head: () => ({
    meta: [
      { title: 'English Games · Rumah Belajar Milenial Cendekia' },
      {
        name: 'description',
        content:
          'Permainan soal Bahasa Inggris untuk SD, SMP, dan SMA: kuis pilihan ganda, susun kata, isi titik-titik, dan cocokkan kata.',
      },
    ],
  }),
  component: GamesHub,
})

const icons: Record<GameId, typeof Sparkles> = {
  kuis: Sparkles,
  'susun-kata': Shuffle,
  'isi-titik': BookOpen,
  cocokkan: Puzzle,
}

function GamesHub() {
  return (
    <GamesLayout
      back={false}
      title="English Games"
      subtitle="Let's learn English the fun way! Pilih permainan, lalu pilih jenjang kelasmu."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {games.map((g) => {
          const Icon = icons[g.id]
          return (
            <article
              key={g.id}
              className="flex flex-col overflow-hidden rounded-[2rem] border border-border bg-card shadow-sm"
            >
              <div className={cn('bg-gradient-to-br p-6 text-primary-foreground', g.color)}>
                <div className="flex items-start justify-between">
                  <span className="grid size-14 place-items-center rounded-2xl bg-white/15 ring-1 ring-white/25">
                    <Icon className="size-7 text-accent" />
                  </span>
                  <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold">
                    {g.skill}
                  </span>
                </div>
                <div className="mt-5 text-sm font-semibold uppercase tracking-widest opacity-80">
                  {g.english}
                </div>
                <h2 className="text-3xl font-extrabold uppercase">{g.title}</h2>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="flex-1 leading-relaxed text-muted-foreground">
                  {g.description}
                </p>
                <div className="mt-5 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Pilih jenjang
                </div>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {levels.map((l) => (
                    <Link
                      key={l.id}
                      to="/games/$game"
                      params={{ game: g.id }}
                      search={{ level: l.id }}
                      className="group rounded-2xl border-2 border-border px-3 py-3 text-center transition-colors hover:border-primary hover:bg-secondary"
                    >
                      <div className="font-display text-lg font-bold uppercase text-navy group-hover:text-primary">
                        {l.label}
                      </div>
                      <div className="text-[0.7rem] text-muted-foreground">
                        {l.grade}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </article>
          )
        })}
      </div>

      <section className="mt-10 grid items-center gap-6 rounded-[2rem] border-2 border-dashed border-primary/40 bg-secondary/60 p-6 md:grid-cols-[1fr_auto] md:p-8">
        <div className="flex gap-4">
          <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-accent text-accent-foreground">
            <PenLine className="size-7" />
          </span>
          <div>
            <h2 className="text-3xl font-extrabold uppercase text-navy">
              Tools untuk Guru: Buat Kuis Sendiri
            </h2>
            <p className="mt-1 max-w-2xl text-muted-foreground">
              Tulis soal pilihan ganda sesuai materi kelas, lalu bagikan
              tautannya ke siswa lewat WhatsApp — atau mainkan beregu di
              proyektor dengan <Users className="inline size-4" /> Mode Kelas.
            </p>
          </div>
        </div>
        <Link
          to="/games/buat"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 font-bold text-primary-foreground shadow-md shadow-primary/25"
        >
          Buat Kuis <ArrowRight className="size-4" />
        </Link>
      </section>
    </GamesLayout>
  )
}
