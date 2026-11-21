import { useEffect, useMemo, useState } from 'react'

import { shuffle, type MatchPair } from '@/data/english-questions'
import { cn } from '@/lib/utils'
import { ResultCard, StatPill } from './game-ui'

type Card = { key: string; pair: number; text: string; lang: 'en' | 'id' }

export function MatchGame({
  pairs,
  count = 6,
}: {
  pairs: MatchPair[]
  count?: number
}) {
  const [round, setRound] = useState(0)
  return (
    <MatchRun
      key={round}
      pairs={pairs}
      count={count}
      onRestart={() => setRound((r) => r + 1)}
    />
  )
}

function MatchRun({
  pairs,
  count,
  onRestart,
}: {
  pairs: MatchPair[]
  count: number
  onRestart: () => void
}) {
  const cards = useMemo<Card[]>(() => {
    const chosen = shuffle(pairs).slice(0, count)
    return shuffle(
      chosen.flatMap((p, i) => [
        { key: `en-${i}`, pair: i, text: p.en, lang: 'en' as const },
        { key: `id-${i}`, pair: i, text: p.id, lang: 'id' as const },
      ]),
    )
  }, [pairs, count])

  const [open, setOpen] = useState<string[]>([])
  const [matched, setMatched] = useState<Set<number>>(new Set())
  const [moves, setMoves] = useState(0)
  const [seconds, setSeconds] = useState(0)

  const total = cards.length / 2
  const finished = matched.size === total

  useEffect(() => {
    if (finished) return
    const t = setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => clearInterval(t)
  }, [finished])

  useEffect(() => {
    if (open.length !== 2) return
    const [a, b] = open.map((k) => cards.find((c) => c.key === k)!)
    if (a.pair === b.pair) {
      setMatched((m) => new Set(m).add(a.pair))
      setOpen([])
      return
    }
    const t = setTimeout(() => setOpen([]), 900)
    return () => clearTimeout(t)
  }, [open, cards])

  const flip = (card: Card) => {
    if (open.length === 2 || open.includes(card.key) || matched.has(card.pair)) return
    if (open.length === 1) setMoves((m) => m + 1)
    setOpen((o) => [...o, card.key])
  }

  if (finished) {
    const efficiency = Math.round((total / Math.max(moves, 1)) * total)
    return (
      <ResultCard
        correct={Math.min(efficiency, total)}
        total={total}
        onRestart={onRestart}
        extra={
          <div className="mt-3 grid grid-cols-2 gap-3">
            <StatPill label="Langkah" value={moves} />
            <StatPill label="Waktu" value={`${seconds}s`} />
          </div>
        }
      />
    )
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <StatPill label="Pasangan" value={`${matched.size}/${total}`} />
        <StatPill label="Langkah" value={moves} />
        <StatPill label="Waktu" value={`${seconds}s`} />
        <p className="ml-auto max-w-xs text-sm text-muted-foreground">
          Buka dua kartu: pasangkan kata <strong className="text-primary">English</strong>{' '}
          dengan artinya dalam <strong className="text-teal">Bahasa Indonesia</strong>.
        </p>
      </div>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
        {cards.map((c) => {
          const isOpen = open.includes(c.key) || matched.has(c.pair)
          const isMatched = matched.has(c.pair)
          return (
            <button
              key={c.key}
              type="button"
              onClick={() => flip(c)}
              className={cn(
                'relative aspect-[4/3] rounded-2xl p-2 text-center font-bold transition-all duration-300',
                !isOpen &&
                  'bg-brand-gradient text-primary-foreground shadow-md hover:-translate-y-1',
                isOpen && !isMatched && 'animate-pop border-2 border-primary bg-card',
                isMatched && 'border-2 border-success bg-success/10 opacity-80',
              )}
              aria-label={isOpen ? c.text : 'Kartu tertutup'}
            >
              {isOpen ? (
                <span className="flex h-full flex-col items-center justify-center gap-1">
                  <span
                    className={cn(
                      'text-[0.6rem] font-bold uppercase tracking-widest',
                      c.lang === 'en' ? 'text-primary' : 'text-teal',
                    )}
                  >
                    {c.lang === 'en' ? 'English' : 'Indonesia'}
                  </span>
                  <span className="text-base text-navy sm:text-xl">{c.text}</span>
                </span>
              ) : (
                <img
                  src="/img/logo-icon.png"
                  alt=""
                  className="mx-auto h-1/2 w-auto opacity-90 brightness-0 invert"
                />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
