import { useMemo, useState } from 'react'
import { ArrowRight, CircleCheck, CircleX, Delete, Shuffle } from 'lucide-react'

import { shuffle, type ScrambleWord } from '@/data/english-questions'
import { cn } from '@/lib/utils'
import { ProgressBar, ResultCard, StatPill } from './game-ui'

type Tile = { id: number; ch: string }

function scramble(word: string): Tile[] {
  const tiles = word.split('').map((ch, id) => ({ id, ch }))
  let mixed = shuffle(tiles)
  for (let i = 0; i < 5 && mixed.map((t) => t.ch).join('') === word; i++) {
    mixed = shuffle(tiles)
  }
  return mixed
}

export function ScrambleGame({
  words,
  count = 8,
}: {
  words: ScrambleWord[]
  count?: number
}) {
  const [round, setRound] = useState(0)
  return (
    <ScrambleRun
      key={round}
      words={words}
      count={count}
      onRestart={() => setRound((r) => r + 1)}
    />
  )
}

function ScrambleRun({
  words,
  count,
  onRestart,
}: {
  words: ScrambleWord[]
  count: number
  onRestart: () => void
}) {
  const deck = useMemo(() => shuffle(words).slice(0, count), [words, count])
  const [index, setIndex] = useState(0)
  const [pool, setPool] = useState<Tile[]>(() => scramble(deck[0].word))
  const [picked, setPicked] = useState<Tile[]>([])
  const [status, setStatus] = useState<'playing' | 'right' | 'wrong'>('playing')
  const [correct, setCorrect] = useState(0)
  const [done, setDone] = useState(false)

  const item = deck[index]
  const attempt = picked.map((t) => t.ch).join('')

  const pick = (tile: Tile) => {
    if (status === 'right') return
    const nextPicked = [...picked, tile]
    setPool((p) => p.filter((t) => t.id !== tile.id))
    setPicked(nextPicked)
    if (nextPicked.length === item.word.length) {
      const word = nextPicked.map((t) => t.ch).join('')
      if (word === item.word) {
        setStatus('right')
        setCorrect((c) => c + 1)
      } else {
        setStatus('wrong')
      }
    } else {
      setStatus('playing')
    }
  }
  const unpick = (tile: Tile) => {
    if (status === 'right') return
    setStatus('playing')
    setPicked((p) => p.filter((t) => t.id !== tile.id))
    setPool((p) => [...p, tile])
  }
  const clear = () => {
    setStatus('playing')
    setPool(scramble(item.word))
    setPicked([])
  }

  const next = () => {
    if (index + 1 >= deck.length) {
      setDone(true)
      return
    }
    const n = index + 1
    setIndex(n)
    setPool(scramble(deck[n].word))
    setPicked([])
    setStatus('playing')
  }

  const giveUp = () => {
    setPicked(item.word.split('').map((ch, id) => ({ id: 1000 + id, ch })))
    setPool([])
    setStatus('wrong')
  }

  if (done) {
    return <ResultCard correct={correct} total={deck.length} onRestart={onRestart} />
  }

  const revealed = status === 'wrong' && pool.length === 0 && attempt === item.word

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-5 flex items-center gap-3">
        <StatPill label="Benar" value={correct} />
        <StatPill label="Kata" value={`${index + 1}/${deck.length}`} />
      </div>
      <ProgressBar value={index + (status === 'right' || revealed ? 1 : 0)} total={deck.length} />

      <div
        key={index}
        className="animate-pop mt-6 rounded-[2rem] border border-border bg-card p-6 text-center shadow-sm md:p-10"
      >
        <div className="text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground">
          Petunjuk
        </div>
        <div className="mt-1 text-2xl font-bold text-navy md:text-3xl">
          {item.hint}
        </div>
        <div className="mt-1 text-sm text-muted-foreground">
          {item.word.length} huruf
        </div>

        <div
          className={cn(
            'mx-auto mt-8 flex min-h-16 flex-wrap justify-center gap-2',
            status === 'wrong' && !revealed && 'animate-shake',
          )}
        >
          {item.word.split('').map((_, i) => {
            const tile = picked[i]
            return (
              <button
                key={i}
                type="button"
                onClick={() => tile && unpick(tile)}
                className={cn(
                  'grid size-11 place-items-center rounded-xl border-2 font-display text-2xl font-extrabold transition-colors md:size-14 md:text-3xl',
                  !tile && 'border-dashed border-border',
                  tile && status === 'playing' && 'border-primary bg-secondary text-navy',
                  tile && status === 'right' && 'border-success bg-success/15 text-success',
                  tile && status === 'wrong' && 'border-destructive bg-destructive/10 text-destructive',
                )}
                aria-label={tile ? `Hapus huruf ${tile.ch}` : 'Kotak kosong'}
              >
                {tile?.ch}
              </button>
            )
          })}
        </div>

        <div className="mx-auto mt-8 flex flex-wrap justify-center gap-2">
          {pool.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => pick(t)}
              className="bg-brand-gradient grid size-12 place-items-center rounded-xl font-display text-2xl font-extrabold text-primary-foreground shadow-md transition-transform hover:-translate-y-1 md:size-14 md:text-3xl"
            >
              {t.ch}
            </button>
          ))}
        </div>

        {status === 'playing' || (status === 'wrong' && !revealed) ? (
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {status === 'wrong' && (
              <p className="w-full text-sm font-semibold text-destructive">
                Belum tepat — ketuk huruf untuk mengubah susunan.
              </p>
            )}
            <button
              type="button"
              onClick={clear}
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold hover:bg-muted"
            >
              <Shuffle className="size-4" /> Acak ulang
            </button>
            {picked.length > 0 && (
              <button
                type="button"
                onClick={() => unpick(picked[picked.length - 1])}
                className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold hover:bg-muted"
              >
                <Delete className="size-4" /> Hapus
              </button>
            )}
            <button
              type="button"
              onClick={giveUp}
              className="rounded-full px-4 py-2 text-sm font-semibold text-muted-foreground hover:text-destructive"
            >
              Menyerah
            </button>
          </div>
        ) : (
          <div className="animate-pop mt-8 flex flex-col items-center gap-3">
            <div
              className={cn(
                'flex items-center gap-2 font-display text-2xl font-extrabold uppercase',
                status === 'right' ? 'text-success' : 'text-destructive',
              )}
            >
              {status === 'right' ? (
                <>
                  <CircleCheck className="size-6" /> Correct!
                </>
              ) : (
                <>
                  <CircleX className="size-6" /> Jawabannya: {item.word}
                </>
              )}
            </div>
            <button
              type="button"
              onClick={next}
              autoFocus
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-bold text-primary-foreground"
            >
              {index + 1 >= deck.length ? 'Lihat Hasil' : 'Kata Berikutnya'}
              <ArrowRight className="size-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
