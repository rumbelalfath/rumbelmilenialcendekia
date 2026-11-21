import { useEffect, useMemo, useState } from 'react'
import { ArrowRight, CircleCheck, CircleX, Lightbulb, Timer, Users } from 'lucide-react'

import { shuffle, type ChoiceQuestion } from '@/data/english-questions'
import { cn } from '@/lib/utils'
import { ProgressBar, ResultCard, StatPill } from './game-ui'

const SECONDS = 20
const LETTERS = ['A', 'B', 'C', 'D']

type Mode = 'solo' | 'team'

type Answered = { picked: number | null; correct: boolean }

export function ChoiceQuiz({
  questions,
  count = 10,
}: {
  questions: ChoiceQuestion[]
  count?: number
}) {
  const [mode, setMode] = useState<Mode | null>(null)
  const [useTimer, setUseTimer] = useState(true)
  const [round, setRound] = useState(0)

  if (!mode) {
    return (
      <div className="mx-auto max-w-xl rounded-[2rem] border border-border bg-card p-8 shadow-sm">
        <h2 className="text-3xl font-extrabold uppercase text-navy">
          Pilih mode permainan
        </h2>
        <p className="mt-1 text-muted-foreground">
          {Math.min(count, questions.length)} soal · jawab secepat mungkin untuk
          bonus poin.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => setMode('solo')}
            className="rounded-2xl border-2 border-border p-5 text-left transition-colors hover:border-primary"
          >
            <span className="text-3xl">🧑‍🎓</span>
            <div className="mt-2 font-display text-xl font-bold uppercase text-navy">
              Main Sendiri
            </div>
            <p className="text-sm text-muted-foreground">
              Latihan mandiri di HP atau laptop.
            </p>
          </button>
          <button
            type="button"
            onClick={() => setMode('team')}
            className="rounded-2xl border-2 border-border p-5 text-left transition-colors hover:border-primary"
          >
            <Users className="size-8 text-primary" />
            <div className="mt-2 font-display text-xl font-bold uppercase text-navy">
              Mode Kelas (2 Tim)
            </div>
            <p className="text-sm text-muted-foreground">
              Tim A & Tim B bergiliran menjawab — cocok untuk proyektor.
            </p>
          </button>
        </div>
        <label className="mt-5 flex cursor-pointer items-center gap-3 text-sm font-semibold">
          <input
            type="checkbox"
            checked={useTimer}
            onChange={(e) => setUseTimer(e.target.checked)}
            className="size-4 accent-[var(--primary)]"
          />
          Gunakan waktu {SECONDS} detik per soal
        </label>
      </div>
    )
  }

  return (
    <QuizRun
      key={round}
      questions={questions}
      count={count}
      mode={mode}
      useTimer={useTimer}
      onRestart={() => setRound((r) => r + 1)}
      onChangeMode={() => setMode(null)}
    />
  )
}

function QuizRun({
  questions,
  count,
  mode,
  useTimer,
  onRestart,
  onChangeMode,
}: {
  questions: ChoiceQuestion[]
  count: number
  mode: Mode
  useTimer: boolean
  onRestart: () => void
  onChangeMode: () => void
}) {
  const deck = useMemo(
    () => shuffle(questions).slice(0, Math.min(count, questions.length)),
    [questions, count],
  )
  const [index, setIndex] = useState(0)
  const [answered, setAnswered] = useState<Answered | null>(null)
  const [timeLeft, setTimeLeft] = useState(SECONDS)
  const [scores, setScores] = useState<[number, number]>([0, 0])
  const [correctCount, setCorrectCount] = useState<[number, number]>([0, 0])
  const [streak, setStreak] = useState(0)
  const [done, setDone] = useState(false)

  const q = deck[index]
  const team = mode === 'team' ? index % 2 : 0

  const answer = (picked: number | null) => {
    if (answered) return
    const correct = picked === q.answer
    setAnswered({ picked, correct })
    if (correct) {
      const bonus = useTimer ? Math.ceil(timeLeft / 2) : 0
      const streakBonus = Math.min(streak, 5) * 2
      setScores((s) => {
        const n: [number, number] = [...s]
        n[team] += 10 + bonus + streakBonus
        return n
      })
      setCorrectCount((c) => {
        const n: [number, number] = [...c]
        n[team] += 1
        return n
      })
      setStreak((s) => s + 1)
    } else {
      setStreak(0)
    }
  }

  useEffect(() => {
    if (!useTimer || answered || done) return
    if (timeLeft <= 0) {
      answer(null)
      return
    }
    const t = setTimeout(() => setTimeLeft((s) => s - 1), 1000)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, answered, done, useTimer])

  const next = () => {
    if (index + 1 >= deck.length) {
      setDone(true)
      return
    }
    setIndex((i) => i + 1)
    setAnswered(null)
    setTimeLeft(SECONDS)
  }

  if (done) {
    const total = correctCount[0] + correctCount[1]
    return (
      <ResultCard
        correct={total}
        total={deck.length}
        score={mode === 'solo' ? scores[0] : undefined}
        onRestart={onRestart}
        extra={
          <>
            {mode === 'team' && (
              <div className="mt-4 rounded-2xl bg-secondary p-4">
                <div className="font-display text-2xl font-extrabold uppercase text-navy">
                  {scores[0] === scores[1]
                    ? 'Seri! 🤝'
                    : `Tim ${scores[0] > scores[1] ? 'A' : 'B'} menang! 🎉`}
                </div>
                <div className="mt-2 grid grid-cols-2 gap-3">
                  <StatPill label="Tim A" value={scores[0]} />
                  <StatPill label="Tim B" value={scores[1]} />
                </div>
              </div>
            )}
            <button
              type="button"
              onClick={onChangeMode}
              className="mt-4 block w-full text-sm font-semibold text-primary hover:underline"
            >
              Ganti mode permainan
            </button>
          </>
        }
      />
    )
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-5 flex flex-wrap items-center gap-3">
        {mode === 'team' ? (
          <>
            {(['A', 'B'] as const).map((t, i) => (
              <StatPill
                key={t}
                label={`Tim ${t}`}
                value={scores[i]}
                className={cn(
                  'transition-all',
                  team === i && 'border-primary ring-2 ring-primary/30',
                )}
              />
            ))}
          </>
        ) : (
          <>
            <StatPill label="Skor" value={scores[0]} />
            <StatPill label="Beruntun" value={`🔥 ${streak}`} />
          </>
        )}
        {useTimer && (
          <div
            className={cn(
              'ml-auto flex items-center gap-2 rounded-2xl px-4 py-3 font-display text-2xl font-extrabold',
              timeLeft <= 5 && !answered
                ? 'bg-destructive/10 text-destructive'
                : 'bg-secondary text-secondary-foreground',
            )}
          >
            <Timer className="size-5" /> {timeLeft}s
          </div>
        )}
      </div>

      <ProgressBar value={index + (answered ? 1 : 0)} total={deck.length} />

      <div
        key={index}
        className="animate-pop mt-6 rounded-[2rem] border border-border bg-card p-6 shadow-sm md:p-10"
      >
        <div className="flex items-center justify-between text-sm font-bold text-muted-foreground">
          <span>
            Soal {index + 1} dari {deck.length}
          </span>
          {mode === 'team' && (
            <span className="rounded-full bg-accent px-3 py-1 text-accent-foreground">
              Giliran Tim {team === 0 ? 'A' : 'B'}
            </span>
          )}
        </div>
        <h2 className="mt-4 font-sans text-2xl font-bold leading-snug text-foreground md:text-3xl">
          {q.question}
        </h2>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {q.options.map((opt, i) => {
            const isAnswer = i === q.answer
            const isPicked = answered?.picked === i
            return (
              <button
                key={i}
                type="button"
                disabled={!!answered}
                onClick={() => answer(i)}
                className={cn(
                  'flex items-center gap-4 rounded-2xl border-2 px-4 py-4 text-left text-lg font-semibold transition-all',
                  !answered &&
                    'border-border hover:-translate-y-0.5 hover:border-primary hover:bg-secondary',
                  answered && isAnswer && 'border-success bg-success/10',
                  answered &&
                    isPicked &&
                    !isAnswer &&
                    'animate-shake border-destructive bg-destructive/10',
                  answered && !isAnswer && !isPicked && 'border-border opacity-50',
                )}
              >
                <span
                  className={cn(
                    'grid size-9 shrink-0 place-items-center rounded-xl font-display text-lg font-bold',
                    answered && isAnswer
                      ? 'bg-success text-white'
                      : 'bg-secondary text-secondary-foreground',
                  )}
                >
                  {LETTERS[i]}
                </span>
                {opt}
              </button>
            )
          })}
        </div>

        {answered && (
          <div className="animate-pop mt-6 flex flex-col gap-4 rounded-2xl bg-muted p-4 sm:flex-row sm:items-center">
            <div className="flex-1">
              <div
                className={cn(
                  'flex items-center gap-2 font-display text-2xl font-extrabold uppercase',
                  answered.correct ? 'text-success' : 'text-destructive',
                )}
              >
                {answered.correct ? (
                  <>
                    <CircleCheck className="size-6" /> Correct!
                  </>
                ) : answered.picked === null ? (
                  <>
                    <Timer className="size-6" /> Time's up!
                  </>
                ) : (
                  <>
                    <CircleX className="size-6" /> Oops!
                  </>
                )}
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                Jawaban: <strong>{q.options[q.answer]}</strong>
                {q.explain && (
                  <span className="mt-1 flex gap-1.5">
                    <Lightbulb className="mt-0.5 size-4 shrink-0 text-accent-foreground" />
                    {q.explain}
                  </span>
                )}
              </p>
            </div>
            <button
              type="button"
              onClick={next}
              autoFocus
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 font-bold text-primary-foreground"
            >
              {index + 1 >= deck.length ? 'Lihat Hasil' : 'Lanjut'}
              <ArrowRight className="size-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
