import { RotateCcw, Trophy } from 'lucide-react'

import { cn } from '@/lib/utils'

export function ProgressBar({ value, total }: { value: number; total: number }) {
  return (
    <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
      <div
        className="h-full rounded-full bg-primary transition-all duration-500"
        style={{ width: `${Math.round((value / Math.max(total, 1)) * 100)}%` }}
      />
    </div>
  )
}

export function StatPill({
  label,
  value,
  className,
}: {
  label: string
  value: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-border bg-card px-4 py-2 text-center',
        className,
      )}
    >
      <div className="text-[0.65rem] font-bold uppercase tracking-widest text-muted-foreground">
        {label}
      </div>
      <div className="font-display text-2xl font-extrabold text-navy">
        {value}
      </div>
    </div>
  )
}

function verdict(pct: number) {
  if (pct >= 90) return { title: 'Excellent!', note: 'Luar biasa, pertahankan!' }
  if (pct >= 70) return { title: 'Great job!', note: 'Hebat, sedikit lagi sempurna.' }
  if (pct >= 50) return { title: 'Good try!', note: 'Bagus, terus berlatih ya.' }
  return { title: 'Keep going!', note: 'Jangan menyerah, coba lagi!' }
}

export function ResultCard({
  correct,
  total,
  score,
  extra,
  onRestart,
}: {
  correct: number
  total: number
  score?: number
  extra?: React.ReactNode
  onRestart: () => void
}) {
  const pct = Math.round((correct / Math.max(total, 1)) * 100)
  const v = verdict(pct)
  const stars = pct >= 90 ? 3 : pct >= 60 ? 2 : pct > 0 ? 1 : 0
  return (
    <div className="animate-pop mx-auto max-w-lg rounded-[2rem] border border-border bg-card p-8 text-center shadow-xl shadow-navy/10">
      <div className="bg-brand-gradient mx-auto grid size-20 place-items-center rounded-full text-primary-foreground shadow-lg">
        <Trophy className="size-10 text-accent" />
      </div>
      <h2 className="mt-5 text-5xl font-extrabold uppercase text-navy">
        {v.title}
      </h2>
      <p className="mt-1 text-muted-foreground">{v.note}</p>
      <div className="mt-4 text-3xl tracking-widest" aria-label={`${stars} bintang`}>
        {[0, 1, 2].map((i) => (
          <span key={i} className={i < stars ? 'text-accent' : 'text-muted'}>
            ★
          </span>
        ))}
      </div>
      <div className="mt-6 grid grid-cols-2 gap-3">
        <StatPill label="Benar" value={`${correct}/${total}`} />
        <StatPill
          label={score !== undefined ? 'Skor' : 'Akurasi'}
          value={score !== undefined ? score : `${pct}%`}
        />
      </div>
      {extra}
      <button
        type="button"
        onClick={onRestart}
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-bold text-primary-foreground shadow-md shadow-primary/25 transition-transform hover:-translate-y-0.5"
      >
        <RotateCcw className="size-4" /> Main Lagi
      </button>
    </div>
  )
}

export function normalizeAnswer(s: string) {
  return s
    .trim()
    .toLowerCase()
    .replace(/[’‘`]/g, "'")
    .replace(/\s+/g, ' ')
    .replace(/[.!?]$/, '')
}
