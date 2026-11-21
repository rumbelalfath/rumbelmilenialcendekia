import { z } from 'zod'

import type { ChoiceQuestion } from '@/data/english-questions'

/**
 * Teacher-made quizzes are stored entirely inside the share link (base64url JSON),
 * so no account or database is needed to hand a quiz to a class.
 */
const customQuizSchema = z.object({
  title: z.string().min(1).max(120),
  questions: z
    .array(
      z.object({
        question: z.string().min(1).max(300),
        options: z.array(z.string().min(1).max(120)).min(2).max(4),
        answer: z.number().int().min(0).max(3),
        explain: z.string().max(300).optional(),
      }),
    )
    .min(1)
    .max(50),
})

export type CustomQuiz = { title: string; questions: ChoiceQuestion[] }

function toBase64Url(text: string) {
  const bytes = new TextEncoder().encode(text)
  let bin = ''
  bytes.forEach((b) => (bin += String.fromCharCode(b)))
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function fromBase64Url(code: string) {
  const b64 = code.replace(/-/g, '+').replace(/_/g, '/')
  const bin = atob(b64 + '='.repeat((4 - (b64.length % 4)) % 4))
  const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0))
  return new TextDecoder().decode(bytes)
}

export function encodeQuiz(quiz: CustomQuiz) {
  return toBase64Url(JSON.stringify(quiz))
}

export function decodeQuiz(code: string): CustomQuiz | null {
  try {
    const parsed = customQuizSchema.safeParse(JSON.parse(fromBase64Url(code)))
    if (!parsed.success) return null
    const valid = parsed.data.questions.every((q) => q.answer < q.options.length)
    return valid ? parsed.data : null
  } catch {
    return null
  }
}
