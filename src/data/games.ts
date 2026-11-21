export type GameId = 'kuis' | 'susun-kata' | 'isi-titik' | 'cocokkan'

export const games: {
  id: GameId
  title: string
  english: string
  description: string
  skill: string
  color: string
}[] = [
  {
    id: 'kuis',
    title: 'Kuis Pilihan Ganda',
    english: 'Quiz Challenge',
    description:
      'Jawab soal grammar & vocabulary sebelum waktu habis. Raih bonus beruntun dan mainkan beregu di kelas.',
    skill: 'Grammar · Vocabulary',
    color: 'from-primary to-navy',
  },
  {
    id: 'susun-kata',
    title: 'Susun Kata',
    english: 'Word Scramble',
    description:
      'Huruf-huruf diacak! Susun kembali menjadi kata bahasa Inggris yang benar dengan bantuan petunjuk.',
    skill: 'Spelling',
    color: 'from-teal to-primary',
  },
  {
    id: 'isi-titik',
    title: 'Isi Titik-titik',
    english: 'Fill in the Blank',
    description:
      'Lengkapi kalimat dengan kata yang tepat. Melatih tenses, preposisi, dan kosakata.',
    skill: 'Tenses · Sentence',
    color: 'from-navy to-teal',
  },
  {
    id: 'cocokkan',
    title: 'Cocokkan Kata',
    english: 'Memory Match',
    description:
      'Buka kartu dan pasangkan kata bahasa Inggris dengan artinya. Selesaikan dengan langkah sesedikit mungkin!',
    skill: 'Vocabulary · Memory',
    color: 'from-primary to-teal',
  },
]
