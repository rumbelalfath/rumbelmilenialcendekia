import { useMemo, useState } from 'react'
import { ArrowRight, CircleCheck, CircleX, Lightbulb } from 'lucide-react'

import { shuffle, type FillBlank } from '@/data/english-questions'
import { cn } from '@/lib/utils'
import { normalizeAnswer, ProgressBar, ResultCard, StatPill } from './game-ui'

export function FillGame({
  items,
  count = 8,
}: {
  items: FillBlank[]
  count?: number
}) {
  const [round, setRound] = useState(0)
  return (
    <FillRun
      key={round}
      items={items}
      count={count}
      onRestart={() => setRound((r) => r + 1)}
    />
  )
}

function FillRun({
  items,
  count,
  onRestart,
}: {
  items: FillBlank[]
  count: number
  onRestart: () => void
}) {
  const deck = useMemo(() => shuffle(items).slice(0, count), [items, count])
  const [index, setIndex] = useState(0)
  const [value, setValue] = useState('')
  const [showHint, setShowHint] = useState(false)
  const [result, setResult] = useState<null | boolean>(null)
  const [correct, setCorrect] = useState(0)
  const [done, setDone] = useState(false)

  const item = deck[index]
  const [before, after] = item.sentence.split('___')

  const check = (e: React.FormEvent) => {
    e.preventDefault()
    if (result !== null) {
      next()
      return
    }
    if (!value.trim()) return
    const ok = normalizeAnswer(value) === normalizeAnswer(item.answer)
    setResult(ok)
    if (ok) setCorrect((c) => c + 1)
  }

  const next = () => {
    if (index + 1 >= deck.length) {
      setDone(true)
      return
    }
    setIndex((i) => i + 1)
    setValue('')
    setResult(null)
    setShowHint(false)
  }

  if (done) {
    return <ResultCard correct={correct} total={deck.length} onRestart={onRestart} />
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-5 flex items-center gap-3">
        <StatPill label="Benar" value={correct} />
        <StatPill label="Soal" value={`${index + 1}/${deck.length}`} />
      </div>
      <ProgressBar value={index + (result !== null ? 1 : 0)} total={deck.length} />

      <form
        key={index}
        onSubmit={check}
        className="animate-pop mt-6 rounded-[2rem] border border-border bg-card p-6 shadow-sm md:p-10"
      >
        <div className="text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground">
          Complete the sentence
        </div>
        <p className="mt-4 text-2xl font-bold leading-relaxed text-foreground md:text-3xl">
          {before}
          <span
            className={cn(
              'mx-1 inline-block min-w-24 rounded-lg border-b-4 px-2 text-center',
              result === null && 'border-primary text-primary',
              result === true && 'border-success bg-success/10 text-success',
              result === false && 'border-destructive bg-destructive/10 text-destructive line-through',
            )}
          >
            {value || ' '}
          </span>
          {after}
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <input
            autoFocus
            value={value}
            disabled={result !== null}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Ketik jawabanmu…"
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            className={cn(
              'h-14 flex-1 rounded-2xl border-2 border-input bg-background px-5 text-lg font-semibold focus:border-primary focus:outline-none',
              result === false && 'animate-shake',
            )}
          />
          <button
            type="submit"
            className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-primary px-6 font-bold text-primary-foreground"
          >
            {result === null ? 'Cek Jawaban' : index + 1 >= deck.length ? 'Lihat Hasil' : 'Lanjut'}
            <ArrowRight className="size-4" />
          </button>
        </div>

        {result === null ? (
          <button
            type="button"
            onClick={() => setShowHint(true)}
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary"
          >
            <Lightbulb className="size-4" />
            {showHint ? `Petunjuk: ${item.hint}` : 'Lihat petunjuk'}
          </button>
        ) : (
          <div
            className={cn(
              'animate-pop mt-5 flex items-center gap-2 rounded-2xl p-4 font-semibold',
              result ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive',
            )}
          >
            {result ? <CircleCheck className="size-5" /> : <CircleX className="size-5" />}
            {result ? 'Correct! Well done.' : `Jawaban yang benar: "${item.answer}"`}
          </div>
        )}
      </form>
    </div>
  )
}
