import { createFileRoute, Link, notFound } from '@tanstack/react-router'

import { ChoiceQuiz } from '@/components/games/choice-quiz'
import { FillGame } from '@/components/games/fill-game'
import { GameLoading, GamesLayout } from '@/components/games/games-layout'
import { MatchGame } from '@/components/games/match-game'
import { ScrambleGame } from '@/components/games/scramble-game'
import {
  choiceBank,
  fillBank,
  levels,
  matchBank,
  scrambleBank,
  type Level,
} from '@/data/english-questions'
import { games } from '@/data/games'
import { cn } from '@/lib/utils'
import { useMounted } from '@/lib/use-mounted'

const levelIds = levels.map((l) => l.id)

export const Route = createFileRoute('/games/$game')({
  validateSearch: (search: Record<string, unknown>): { level: Level } => ({
    level: levelIds.includes(search.level as Level)
      ? (search.level as Level)
      : 'sd',
  }),
  loader: ({ params }) => {
    const game = games.find((g) => g.id === params.game)
    if (!game) throw notFound()
    return { game }
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          {
            title: `${loaderData.game.title} · English Games Rumah Belajar Milenial Cendekia`,
          },
          { name: 'description', content: loaderData.game.description },
        ]
      : [],
  }),
  component: GamePage,
})

function GamePage() {
  const { game } = Route.useLoaderData()
  const { level } = Route.useSearch()
  const mounted = useMounted()
  const levelInfo = levels.find((l) => l.id === level)!

  return (
    <GamesLayout
      title={game.title}
      subtitle={
        <>
          <span className="font-semibold">{game.english}</span> ·{' '}
          {game.description}
        </>
      }
      actions={
        <div className="flex rounded-full bg-white/15 p-1 ring-1 ring-white/25">
          {levels.map((l) => (
            <Link
              key={l.id}
              to="/games/$game"
              params={{ game: game.id }}
              search={{ level: l.id }}
              className={cn(
                'rounded-full px-4 py-2 text-sm font-bold transition-colors',
                l.id === level
                  ? 'bg-accent text-accent-foreground'
                  : 'hover:bg-white/10',
              )}
            >
              {l.label}
            </Link>
          ))}
        </div>
      }
    >
      <p className="mb-6 text-center text-sm font-semibold text-muted-foreground">
        Jenjang {levelInfo.label} · {levelInfo.grade}
      </p>
      {!mounted ? (
        <GameLoading />
      ) : game.id === 'kuis' ? (
        <ChoiceQuiz key={level} questions={choiceBank[level]} />
      ) : game.id === 'susun-kata' ? (
        <ScrambleGame key={level} words={scrambleBank[level]} />
      ) : game.id === 'isi-titik' ? (
        <FillGame key={level} items={fillBank[level]} />
      ) : (
        <MatchGame key={level} pairs={matchBank[level]} />
      )}
    </GamesLayout>
  )
}
