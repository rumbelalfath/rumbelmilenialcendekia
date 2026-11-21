import { useMemo } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { PenLine } from 'lucide-react'

import { ChoiceQuiz } from '@/components/games/choice-quiz'
import { GameLoading, GamesLayout } from '@/components/games/games-layout'
import { decodeQuiz } from '@/lib/quiz-share'
import { useMounted } from '@/lib/use-mounted'

export const Route = createFileRoute('/games/kuis-guru')({
  validateSearch: (search: Record<string, unknown>): { set: string } => ({
    set: typeof search.set === 'string' ? search.set : '',
  }),
  head: () => ({
    meta: [{ title: 'Kuis dari Guru · English Games' }],
  }),
  component: CustomQuizPage,
})

function CustomQuizPage() {
  const { set } = Route.useSearch()
  const mounted = useMounted()
  const quiz = useMemo(() => (mounted && set ? decodeQuiz(set) : null), [set, mounted])

  if (!mounted) {
    return (
      <GamesLayout title="Kuis dari Guru">
        <GameLoading />
      </GamesLayout>
    )
  }

  if (!quiz) {
    return (
      <GamesLayout title="Kuis tidak ditemukan">
        <div className="mx-auto max-w-lg rounded-[2rem] border border-border bg-card p-8 text-center">
          <p className="text-muted-foreground">
            Tautan kuis ini tidak lengkap atau rusak. Minta guru untuk mengirim
            ulang tautannya, atau buat kuis baru.
          </p>
          <Link
            to="/games/buat"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-bold text-primary-foreground"
          >
            <PenLine className="size-4" /> Buat Kuis
          </Link>
        </div>
      </GamesLayout>
    )
  }

  return (
    <GamesLayout
      title={quiz.title}
      subtitle={`Kuis buatan guru · ${quiz.questions.length} soal pilihan ganda`}
      actions={
        <Link
          to="/games/buat"
          search={{ set }}
          className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-bold ring-1 ring-white/25 hover:bg-white/25"
        >
          <PenLine className="size-4" /> Edit kuis
        </Link>
      }
    >
      <ChoiceQuiz questions={quiz.questions} count={quiz.questions.length} />
    </GamesLayout>
  )
}
