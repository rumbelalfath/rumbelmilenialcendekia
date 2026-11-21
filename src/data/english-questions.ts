/**
 * Built-in English question banks, grouped by school level.
 * All games read from here; custom quizzes made by teachers live in the share link instead.
 */

export type Level = 'sd' | 'smp' | 'sma'

export const levels: { id: Level; label: string; grade: string }[] = [
  { id: 'sd', label: 'SD / MI', grade: 'Kelas 1–6' },
  { id: 'smp', label: 'SMP / MTs', grade: 'Kelas 7–9' },
  { id: 'sma', label: 'SMA / MA', grade: 'Kelas 10–12' },
]

export type ChoiceQuestion = {
  question: string
  options: string[]
  answer: number
  explain?: string
}

export type ScrambleWord = { word: string; hint: string }

export type FillBlank = { sentence: string; answer: string; hint: string }

export type MatchPair = { en: string; id: string }

export const choiceBank: Record<Level, ChoiceQuestion[]> = {
  sd: [
    { question: 'What color is a banana?', options: ['Blue', 'Yellow', 'Black', 'Purple'], answer: 1, explain: 'Pisang berwarna kuning = yellow.' },
    { question: '"Kucing" in English is …', options: ['Dog', 'Bird', 'Cat', 'Fish'], answer: 2 },
    { question: 'How many legs does a chicken have?', options: ['Two', 'Four', 'Six', 'Eight'], answer: 0, explain: 'Ayam punya dua kaki = two.' },
    { question: 'I brush my … every morning.', options: ['shoes', 'teeth', 'books', 'chair'], answer: 1, explain: 'Brush my teeth = menggosok gigi.' },
    { question: 'The opposite of "big" is …', options: ['tall', 'long', 'small', 'fat'], answer: 2 },
    { question: 'We use our … to hear.', options: ['eyes', 'nose', 'hands', 'ears'], answer: 3 },
    { question: 'Monday, Tuesday, …, Thursday', options: ['Sunday', 'Wednesday', 'Friday', 'Saturday'], answer: 1 },
    { question: 'A doctor works in a …', options: ['hospital', 'school', 'market', 'mosque'], answer: 0 },
    { question: '"Selamat pagi" in English is …', options: ['Good night', 'Good afternoon', 'Good morning', 'Goodbye'], answer: 2 },
    { question: 'Ten + five = …', options: ['Fifty', 'Fifteen', 'Fourteen', 'Sixteen'], answer: 1 },
    { question: 'My mother\'s mother is my …', options: ['aunt', 'sister', 'grandmother', 'cousin'], answer: 2 },
    { question: 'The sun rises in the …', options: ['east', 'west', 'north', 'south'], answer: 0, explain: 'Matahari terbit dari timur = east.' },
    { question: 'Which one is a fruit?', options: ['Carrot', 'Mango', 'Rice', 'Bread'], answer: 1 },
    { question: 'She … a student.', options: ['am', 'are', 'is', 'be'], answer: 2, explain: 'She / he / it memakai "is".' },
    { question: 'We read the Qur\'an at the …', options: ['mosque', 'zoo', 'beach', 'kitchen'], answer: 0 },
  ],
  smp: [
    { question: 'She … to school every day.', options: ['go', 'goes', 'going', 'gone'], answer: 1, explain: 'Simple present, subjek orang ketiga tunggal → verb + s/es.' },
    { question: 'Yesterday, we … football in the park.', options: ['play', 'plays', 'played', 'playing'], answer: 2, explain: '"Yesterday" → simple past (V2).' },
    { question: 'Look! The children … in the rain.', options: ['dance', 'are dancing', 'danced', 'dances'], answer: 1, explain: '"Look!" menandakan present continuous.' },
    { question: 'My bag is … than yours.', options: ['heavy', 'heaviest', 'heavier', 'more heavy'], answer: 2, explain: 'Comparative: heavy → heavier.' },
    { question: 'Mount Everest is the … mountain in the world.', options: ['high', 'higher', 'highest', 'most high'], answer: 2 },
    { question: '"Could you help me, please?" — This sentence is a …', options: ['request', 'greeting', 'complaint', 'farewell'], answer: 0 },
    { question: 'There … some milk in the fridge.', options: ['are', 'is', 'were', 'be'], answer: 1, explain: 'Milk adalah uncountable noun → is.' },
    { question: 'I have lived here … 2020.', options: ['for', 'since', 'at', 'on'], answer: 1, explain: '"Since" + titik waktu; "for" + durasi.' },
    { question: 'The synonym of "happy" is …', options: ['sad', 'angry', 'glad', 'tired'], answer: 2 },
    { question: 'They will … to Bandung next week.', options: ['travel', 'travelled', 'travels', 'travelling'], answer: 0, explain: 'Will + V1.' },
    { question: 'A text that tells how to make something is called …', options: ['recount', 'procedure', 'narrative', 'descriptive'], answer: 1 },
    { question: 'Rina is good … drawing.', options: ['in', 'on', 'at', 'for'], answer: 2, explain: 'Good at = pandai dalam.' },
    { question: 'Which word is a noun?', options: ['quickly', 'beautiful', 'happiness', 'run'], answer: 2 },
    { question: '"Congratulations on your success!" is used to …', options: ['apologize', 'give praise', 'ask permission', 'refuse'], answer: 1 },
    { question: 'You … wear a helmet when riding a motorcycle.', options: ['must', 'mustn\'t', 'needn\'t', 'can\'t'], answer: 0 },
  ],
  sma: [
    { question: 'If I … rich, I would build a free school.', options: ['am', 'was', 'were', 'be'], answer: 2, explain: 'Conditional type 2 memakai "were" untuk semua subjek.' },
    { question: 'The letter … by the principal yesterday.', options: ['signed', 'was signed', 'is signing', 'has sign'], answer: 1, explain: 'Passive voice simple past: was/were + V3.' },
    { question: 'She said that she … tired.', options: ['is', 'was', 'be', 'has'], answer: 1, explain: 'Reported speech: present → past.' },
    { question: 'By next year, I … my thesis.', options: ['finish', 'will have finished', 'finished', 'am finishing'], answer: 1, explain: 'Future perfect: will have + V3.' },
    { question: 'The man … car was stolen called the police.', options: ['who', 'whom', 'whose', 'which'], answer: 2, explain: '"Whose" menunjukkan kepemilikan.' },
    { question: 'Despite … hard, he failed the test.', options: ['study', 'studied', 'studying', 'to study'], answer: 2, explain: 'Despite + noun / gerund.' },
    { question: 'The antonym of "scarce" is …', options: ['rare', 'abundant', 'limited', 'tiny'], answer: 1 },
    { question: 'I wish I … speak Arabic fluently.', options: ['can', 'could', 'will', 'shall'], answer: 1 },
    { question: 'An exposition text mainly aims to …', options: ['entertain readers', 'persuade readers', 'describe a place', 'retell events'], answer: 1 },
    { question: 'Not only … the exam, but she also got a scholarship.', options: ['she passed', 'did she pass', 'she did pass', 'passed she'], answer: 1, explain: 'Inversion setelah "Not only".' },
    { question: 'He had his hair … at the barbershop.', options: ['cut', 'cutting', 'to cut', 'cuts'], answer: 0, explain: 'Causative have + object + V3.' },
    { question: '"It\'s high time we … our homework." ', options: ['do', 'did', 'done', 'doing'], answer: 1 },
    { question: 'The word "meticulous" means …', options: ['careless', 'very careful', 'very fast', 'lazy'], answer: 1 },
    { question: 'Neither the teacher nor the students … ready.', options: ['is', 'was', 'are', 'be'], answer: 2, explain: 'Kata kerja mengikuti subjek terdekat (students).' },
    { question: 'Hardly … the bell rung when the students left.', options: ['has', 'had', 'did', 'was'], answer: 1 },
  ],
}

export const scrambleBank: Record<Level, ScrambleWord[]> = {
  sd: [
    { word: 'APPLE', hint: 'Buah apel' },
    { word: 'SCHOOL', hint: 'Tempat belajar' },
    { word: 'TEACHER', hint: 'Guru' },
    { word: 'FRIEND', hint: 'Teman' },
    { word: 'WATER', hint: 'Air' },
    { word: 'PENCIL', hint: 'Pensil' },
    { word: 'MOTHER', hint: 'Ibu' },
    { word: 'TIGER', hint: 'Harimau' },
    { word: 'GREEN', hint: 'Warna hijau' },
    { word: 'HOUSE', hint: 'Rumah' },
    { word: 'CHAIR', hint: 'Kursi' },
    { word: 'SEVEN', hint: 'Angka 7' },
  ],
  smp: [
    { word: 'LIBRARY', hint: 'Perpustakaan' },
    { word: 'KNOWLEDGE', hint: 'Pengetahuan' },
    { word: 'HONEST', hint: 'Jujur' },
    { word: 'NEIGHBOR', hint: 'Tetangga' },
    { word: 'HEALTHY', hint: 'Sehat' },
    { word: 'BEAUTIFUL', hint: 'Indah / cantik' },
    { word: 'QUESTION', hint: 'Pertanyaan' },
    { word: 'TOGETHER', hint: 'Bersama-sama' },
    { word: 'JOURNEY', hint: 'Perjalanan' },
    { word: 'SCIENCE', hint: 'Ilmu pengetahuan alam' },
    { word: 'PATIENT', hint: 'Sabar / pasien' },
    { word: 'ENVIRONMENT', hint: 'Lingkungan' },
  ],
  sma: [
    { word: 'LEADERSHIP', hint: 'Kepemimpinan' },
    { word: 'COMMUNITY', hint: 'Komunitas / masyarakat' },
    { word: 'CHARACTER', hint: 'Karakter / akhlak' },
    { word: 'DISRUPTION', hint: 'Disrupsi / gangguan besar' },
    { word: 'GRATITUDE', hint: 'Rasa syukur' },
    { word: 'SCHOLARSHIP', hint: 'Beasiswa' },
    { word: 'RESPONSIBLE', hint: 'Bertanggung jawab' },
    { word: 'ACHIEVEMENT', hint: 'Prestasi' },
    { word: 'TECHNOLOGY', hint: 'Teknologi' },
    { word: 'VOLUNTEER', hint: 'Relawan' },
    { word: 'PERSEVERANCE', hint: 'Ketekunan' },
    { word: 'COLLABORATE', hint: 'Bekerja sama' },
  ],
}

export const fillBank: Record<Level, FillBlank[]> = {
  sd: [
    { sentence: 'I ___ a student.', answer: 'am', hint: 'to be untuk "I"' },
    { sentence: 'The cat is ___ the table. (di bawah)', answer: 'under', hint: 'Preposisi tempat' },
    { sentence: 'My father ___ a farmer.', answer: 'is', hint: 'to be untuk "he"' },
    { sentence: 'Two + three = ___.', answer: 'five', hint: 'Tulis angkanya dalam bahasa Inggris' },
    { sentence: 'We drink ___ when we are thirsty.', answer: 'water', hint: 'Air' },
    { sentence: 'The sky is ___. (biru)', answer: 'blue', hint: 'Warna' },
    { sentence: 'I wash my hands ___ eating.', answer: 'before', hint: 'Sebelum' },
    { sentence: 'There are seven days in a ___.', answer: 'week', hint: 'Minggu (7 hari)' },
    { sentence: 'An elephant is very ___. (besar)', answer: 'big', hint: 'Lawan kata small' },
    { sentence: 'We sleep at ___. (malam)', answer: 'night', hint: 'Malam hari' },
  ],
  smp: [
    { sentence: 'She ___ (read) a book every night.', answer: 'reads', hint: 'Simple present, orang ketiga tunggal' },
    { sentence: 'Last Sunday, I ___ (visit) my grandmother.', answer: 'visited', hint: 'Simple past' },
    { sentence: 'They are ___ (play) badminton now.', answer: 'playing', hint: 'Present continuous' },
    { sentence: 'This book is ___ (interesting) than that one.', answer: 'more interesting', hint: 'Comparative kata panjang' },
    { sentence: 'I have been studying English ___ three years.', answer: 'for', hint: 'Durasi waktu' },
    { sentence: 'He ___ (not / like) spicy food.', answer: "doesn't like", hint: 'Negatif simple present' },
    { sentence: 'Andi is the ___ (tall) student in my class.', answer: 'tallest', hint: 'Superlative' },
    { sentence: 'We ___ (go) to Jakarta tomorrow. (will)', answer: 'will go', hint: 'Simple future' },
    { sentence: 'Please turn ___ the lights before you leave.', answer: 'off', hint: 'Matikan' },
    { sentence: 'Have you ever ___ (eat) durian?', answer: 'eaten', hint: 'Present perfect (V3)' },
  ],
  sma: [
    { sentence: 'If it rains, we ___ (stay) at home.', answer: 'will stay', hint: 'Conditional type 1' },
    { sentence: 'The new library ___ (build) last year.', answer: 'was built', hint: 'Passive voice simple past' },
    { sentence: 'If I had studied harder, I ___ (pass) the exam.', answer: 'would have passed', hint: 'Conditional type 3' },
    { sentence: 'She is used to ___ (wake) up early.', answer: 'waking', hint: 'Be used to + gerund' },
    { sentence: 'The students ___ (discuss) the project when the teacher came.', answer: 'were discussing', hint: 'Past continuous' },
    { sentence: 'I look forward to ___ (hear) from you.', answer: 'hearing', hint: 'Look forward to + gerund' },
    { sentence: 'The girl ___ won the competition is my sister.', answer: 'who', hint: 'Relative pronoun untuk orang' },
    { sentence: 'He suggested that she ___ (see) a doctor.', answer: 'see', hint: 'Subjunctive' },
    { sentence: 'By the time we arrived, the movie ___ (start).', answer: 'had started', hint: 'Past perfect' },
    { sentence: 'Our house needs ___ (paint).', answer: 'painting', hint: 'Need + gerund (makna pasif)' },
  ],
}

export const matchBank: Record<Level, MatchPair[]> = {
  sd: [
    { en: 'Book', id: 'Buku' },
    { en: 'Bird', id: 'Burung' },
    { en: 'Red', id: 'Merah' },
    { en: 'Eye', id: 'Mata' },
    { en: 'Rice', id: 'Nasi' },
    { en: 'Moon', id: 'Bulan' },
    { en: 'Tree', id: 'Pohon' },
    { en: 'Happy', id: 'Senang' },
    { en: 'Door', id: 'Pintu' },
    { en: 'Sister', id: 'Saudari' },
  ],
  smp: [
    { en: 'Brave', id: 'Berani' },
    { en: 'Village', id: 'Desa' },
    { en: 'Polite', id: 'Sopan' },
    { en: 'Market', id: 'Pasar' },
    { en: 'Clean', id: 'Bersih' },
    { en: 'Island', id: 'Pulau' },
    { en: 'Grateful', id: 'Bersyukur' },
    { en: 'Busy', id: 'Sibuk' },
    { en: 'Weather', id: 'Cuaca' },
    { en: 'Borrow', id: 'Meminjam' },
  ],
  sma: [
    { en: 'Sincere', id: 'Ikhlas' },
    { en: 'Awareness', id: 'Kesadaran' },
    { en: 'Generosity', id: 'Kedermawanan' },
    { en: 'Thrive', id: 'Berkembang pesat' },
    { en: 'Humble', id: 'Rendah hati' },
    { en: 'Empower', id: 'Memberdayakan' },
    { en: 'Sustainable', id: 'Berkelanjutan' },
    { en: 'Wisdom', id: 'Kebijaksanaan' },
    { en: 'Diligent', id: 'Rajin' },
    { en: 'Mutual', id: 'Saling / bersama' },
  ],
}

export function shuffle<T>(items: T[]): T[] {
  const a = [...items]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}
