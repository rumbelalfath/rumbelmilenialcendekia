import { useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Check, Copy, Play, Plus, Share2, Sparkles, Trash } from 'lucide-react'
import { toast } from 'sonner'

import { GamesLayout } from '@/components/games/games-layout'
import { Input } from '@/components/ui/input'
import { choiceBank } from '@/data/english-questions'
import { decodeQuiz, encodeQuiz } from '@/lib/quiz-share'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/games/buat')({
  validateSearch: (search: Record<string, unknown>): { set?: string } =>
    typeof search.set === 'string' ? { set: search.set } : {},
  head: () => ({
    meta: [
      { title: 'Buat Kuis Bahasa Inggris · English Games' },
      {
        name: 'description',
        content:
          'Tools untuk guru: buat kuis pilihan ganda Bahasa Inggris dan bagikan tautannya ke siswa.',
      },
    ],
  }),
  component: QuizBuilder,
})

type DraftQuestion = {
  question: string
  options: string[]
  answer: number
  explain: string
}

const LETTERS = ['A', 'B', 'C', 'D']

const emptyQuestion = (): DraftQuestion => ({
  question: '',
  options: ['', '', '', ''],
  answer: 0,
  explain: '',
})

function fromSet(set?: string) {
  const quiz = set ? decodeQuiz(set) : null
  if (!quiz) return null
  return {
    title: quiz.title,
    questions: quiz.questions.map((q) => ({
      question: q.question,
      options: [...q.options, '', '', '', ''].slice(0, 4),
      answer: q.answer,
      explain: q.explain ?? '',
    })),
  }
}

function QuizBuilder() {
  const { set } = Route.useSearch()
  const [initial] = useState(() => fromSet(set))
  const [title, setTitle] = useState(initial?.title ?? '')
  const [questions, setQuestions] = useState<DraftQuestion[]>(
    initial?.questions ?? [emptyQuestion()],
  )
  const [link, setLink] = useState('')
  const [copied, setCopied] = useState(false)

  const update = (i: number, patch: Partial<DraftQuestion>) => {
    setLink('')
    setQuestions((qs) => qs.map((q, j) => (j === i ? { ...q, ...patch } : q)))
  }

  const loadSample = () => {
    setLink('')
    setTitle('Latihan Simple Present & Past')
    setQuestions(
      choiceBank.smp.slice(0, 4).map((q) => ({
        question: q.question,
        options: [...q.options],
        answer: q.answer,
        explain: q.explain ?? '',
      })),
    )
  }

  const problems = questions.flatMap((q, i) => {
    const filled = q.options.filter((o) => o.trim())
    const errs: string[] = []
    if (!q.question.trim()) errs.push(`Soal ${i + 1}: pertanyaan masih kosong`)
    if (filled.length < 2) errs.push(`Soal ${i + 1}: isi minimal 2 pilihan`)
    if (!q.options[q.answer]?.trim())
      errs.push(`Soal ${i + 1}: jawaban benar belum diisi`)
    return errs
  })

  const build = () => {
    if (!title.trim()) {
      toast.error('Beri judul kuis terlebih dahulu.')
      return
    }
    if (problems.length) {
      toast.error(problems[0])
      return
    }
    const cleaned = questions.map((q) => {
      const kept = q.options
        .map((text, idx) => ({ text: text.trim(), idx }))
        .filter((o) => o.text)
      return {
        question: q.question.trim(),
        options: kept.map((o) => o.text),
        answer: kept.findIndex((o) => o.idx === q.answer),
        ...(q.explain.trim() ? { explain: q.explain.trim() } : {}),
      }
    })
    const code = encodeQuiz({ title: title.trim(), questions: cleaned })
    setLink(`${window.location.origin}/games/kuis-guru?set=${code}`)
    setCopied(false)
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(link)
      setCopied(true)
      toast.success('Tautan kuis disalin!')
    } catch {
      toast.error('Gagal menyalin, salin tautan secara manual.')
    }
  }

  const shareCode = link ? new URL(link).searchParams.get('set') ?? '' : ''

  return (
    <GamesLayout
      title="Buat Kuis"
      subtitle="Tools untuk guru: susun soal pilihan ganda sesuai materi kelas, lalu bagikan tautannya. Siswa bisa langsung bermain tanpa akun."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
        <div className="space-y-5">
          <div className="rounded-[2rem] border border-border bg-card p-6">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Judul kuis
            </label>
            <Input
              value={title}
              onChange={(e) => {
                setLink('')
                setTitle(e.target.value)
              }}
              maxLength={120}
              placeholder="Contoh: Vocabulary Kelas 5 — Animals"
              className="mt-2 h-12 rounded-xl text-lg font-semibold"
            />
            <button
              type="button"
              onClick={loadSample}
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
            >
              <Sparkles className="size-4" /> Isi dengan contoh soal
            </button>
          </div>

          {questions.map((q, i) => (
            <div
              key={i}
              className="rounded-[2rem] border border-border bg-card p-6"
            >
              <div className="flex items-center justify-between">
                <span className="font-display text-2xl font-extrabold uppercase text-navy">
                  Soal {i + 1}
                </span>
                {questions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => {
                      setLink('')
                      setQuestions((qs) => qs.filter((_, j) => j !== i))
                    }}
                    className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-semibold text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash className="size-4" /> Hapus
                  </button>
                )}
              </div>
              <textarea
                value={q.question}
                onChange={(e) => update(i, { question: e.target.value })}
                maxLength={300}
                rows={2}
                placeholder="Tulis pertanyaan, misal: She … to school every day."
                className="mt-3 w-full rounded-xl border border-input bg-background px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <p className="mt-3 text-xs font-semibold text-muted-foreground">
                Ketuk huruf untuk menandai jawaban yang benar.
              </p>
              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                {q.options.map((opt, oi) => (
                  <div
                    key={oi}
                    className={cn(
                      'flex items-center gap-2 rounded-xl border-2 p-1.5 pr-2',
                      q.answer === oi ? 'border-success bg-success/5' : 'border-border',
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => update(i, { answer: oi })}
                      className={cn(
                        'grid size-9 shrink-0 place-items-center rounded-lg font-display text-lg font-bold',
                        q.answer === oi
                          ? 'bg-success text-white'
                          : 'bg-secondary text-secondary-foreground',
                      )}
                      aria-label={`Tandai pilihan ${LETTERS[oi]} sebagai jawaban benar`}
                    >
                      {q.answer === oi ? <Check className="size-4" /> : LETTERS[oi]}
                    </button>
                    <input
                      value={opt}
                      maxLength={120}
                      onChange={(e) => {
                        const options = [...q.options]
                        options[oi] = e.target.value
                        update(i, { options })
                      }}
                      placeholder={`Pilihan ${LETTERS[oi]}${oi >= 2 ? ' (opsional)' : ''}`}
                      className="h-9 min-w-0 flex-1 bg-transparent text-sm focus:outline-none"
                    />
                  </div>
                ))}
              </div>
              <input
                value={q.explain}
                maxLength={300}
                onChange={(e) => update(i, { explain: e.target.value })}
                placeholder="Penjelasan singkat (opsional) — muncul setelah siswa menjawab"
                className="mt-3 h-10 w-full rounded-xl border border-input bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          ))}

          {questions.length < 50 && (
            <button
              type="button"
              onClick={() => {
                setLink('')
                setQuestions((qs) => [...qs, emptyQuestion()])
              }}
              className="flex w-full items-center justify-center gap-2 rounded-[2rem] border-2 border-dashed border-primary/40 py-5 font-bold text-primary hover:bg-secondary"
            >
              <Plus className="size-5" /> Tambah Soal
            </button>
          )}
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-[2rem] border border-border bg-card p-6 shadow-sm">
            <h2 className="text-2xl font-extrabold uppercase text-navy">
              Bagikan ke Siswa
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {questions.length} soal ·{' '}
              {problems.length === 0 && title.trim()
                ? 'siap dibagikan'
                : 'lengkapi soal terlebih dahulu'}
            </p>
            <button
              type="button"
              onClick={build}
              className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary font-bold text-primary-foreground shadow-md shadow-primary/25"
            >
              <Share2 className="size-4" /> Buat Tautan Kuis
            </button>

            {link && (
              <div className="animate-pop mt-5 space-y-3">
                <div className="break-all rounded-xl bg-muted p-3 text-xs text-muted-foreground">
                  {link}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={copy}
                    className="inline-flex items-center justify-center gap-1.5 rounded-full border border-border py-2.5 text-sm font-bold hover:bg-muted"
                  >
                    {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                    {copied ? 'Tersalin' : 'Salin'}
                  </button>
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(`Ayo kerjakan kuis Bahasa Inggris "${title.trim()}": ${link}`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 rounded-full bg-success py-2.5 text-sm font-bold text-white"
                  >
                    <Share2 className="size-4" /> WhatsApp
                  </a>
                </div>
                <Link
                  to="/games/kuis-guru"
                  search={{ set: shareCode }}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent py-3 font-bold text-accent-foreground"
                >
                  <Play className="size-4" /> Mainkan Sekarang
                </Link>
                <p className="text-xs text-muted-foreground">
                  Soal tersimpan di dalam tautan. Simpan tautannya — dari
                  halaman kuis, guru bisa menekan “Edit kuis” untuk mengubah
                  soal kapan saja.
                </p>
              </div>
            )}
          </div>
        </aside>
      </div>
    </GamesLayout>
  )
}
