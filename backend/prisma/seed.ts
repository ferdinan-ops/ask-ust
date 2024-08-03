import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'

dotenv.config()

const prisma = new PrismaClient()

async function superAdminSeed() {
  return await prisma.user.create({
    data: {
      fullname: 'Super Admin USTalk',
      username: 'super.admin.ustalk',
      email: 'gabrielsidomulyo234@gmail.com',
      role: 'SUPER_ADMIN',
      is_email_verified: true,
      token: '8967',
      provider: 'google'
    }
  })
}

async function defaultQuestionSeed() {
  // dosen question
  await prisma.question.create({
    data: {
      id: process.env.QUESTION_DOSEN_UUID,
      text: 'Tuliskan nama dari salah satu dosen yang kamu kenal!',
      type: 'TEXT',
      options: JSON.stringify(['']),
      correct_answers: JSON.stringify([''])
    }
  })

  // mata kuliah question
  await prisma.question.create({
    data: {
      id: process.env.QUESTION_MATA_KULIAH_UUID,
      text: 'Dari nama dosen yang kamu tulis, mata kuliah apa yang beliau ajarkan?',
      type: 'TEXT',
      options: JSON.stringify(['']),
      correct_answers: JSON.stringify([''])
    }
  })
}

async function questionSeed() {
  await prisma.question.create({
    data: {
      text: 'Dari daftar fakultas dibawah ini. Pilih fakultas apa saja yang ada pada universitas katolik santo thomas?',
      type: 'CHECKBOX',
      options: JSON.stringify(
        '[{"value":"Fakultas Ilmu Komputer"},{"value":"Fakultas Pertanian"},{"value":"Fakultas Kedokteran"},{"value":"Fakultas Ilmu Budaya"},{"value":"Fakultas Vokasi"},{"value":"Fakultas Keguruan dan Ilmu Pendidikan"}]'
      ),
      correct_answers: JSON.stringify(
        '[{"value":"Fakultas Ilmu Komputer","checked":true},{"value":"Fakultas Pertanian","checked":true},{"value":"Fakultas Kedokteran","checked":false},{"value":"Fakultas Ilmu Budaya","checked":true},{"value":"Fakultas Vokasi","checked":false},{"value":"Fakultas Keguruan dan Ilmu Pendidikan","checked":true}]'
      )
    }
  })

  await prisma.question.create({
    data: {
      text: 'Berapakah jumlah fakultas yang ada di universitas?',
      type: 'TEXT',
      options: JSON.stringify('[{"value":"null"}]'),
      correct_answers: JSON.stringify('[{"value":"8"}]')
    }
  })

  await prisma.question.create({
    data: {
      text: 'Apa tautan dari web yang menyajikan informasi seputar universitas? (Contoh pengisian: google.com)',
      type: 'TEXT',
      options: JSON.stringify('[{"value":"null"}]'),
      correct_answers: JSON.stringify('[{"value":"ust.ac.id"}]')
    }
  })

  await prisma.question.create({
    data: {
      text: 'Dimanakah letak dari gedung rektorat Universitas Katolik Santo Thomas? (Pilih yang paling terdekat dengan rektorat)',
      type: 'RADIO',
      options: JSON.stringify(
        '[{"value":"Disebelah fakultas ekonomi dan fakultas teknik"},{"value":"Disebelah kapel"},{"value":"Ditengah-tengah wilayah universitas"},{"value":"Disebelah fakultas ilmu komputer"},{"value":"Didekat jalan masuk utama"}]'
      ),
      correct_answers: JSON.stringify('[{"value":"disebelah kapel"}]')
    }
  })

  await prisma.question.create({
    data: {
      text: 'Kegiatan apa yang selalu diberikan universitas untuk mahasiswa semester awal?',
      type: 'RADIO',
      options: JSON.stringify('[{"value":"Character Building"},{"value":"Retret"},{"value":"Ibadah bersama"}]'),
      correct_answers: JSON.stringify('[{"value":"character building"}]')
    }
  })

  await prisma.question.create({
    data: {
      text: 'Dari daftar Unit Kegiatan Mahasiswa (UKM) dibawah ini. Pilih UKM yang terdaftar di Universitas Katolik Santo Thomas!',
      type: 'CHECKBOX',
      options: JSON.stringify(
        '[{"value":"Inkubator Sains"},{"value":"Pramuka"},{"value":"Paduan Suara"},{"value":"Startup"},{"value":"Taekwondo"}]'
      ),
      correct_answers: JSON.stringify(
        '[{"value":"Inkubator Sains","checked":false},{"value":"Pramuka","checked":false},{"value":"Paduan Suara","checked":true},{"value":"Startup","checked":false},{"value":"Taekwondo","checked":true}]'
      )
    }
  })

  await prisma.question.create({
    data: {
      text: 'Apa lirik pertama dari lagu Himne Universitas Katolik Santo Thomas?',
      type: 'TEXT',
      options: JSON.stringify('[{"value":"null"}]'),
      correct_answers: JSON.stringify('[{"value":"Omnibus Omnia UNIKA"}]')
    }
  })

  await prisma.question.create({
    data: {
      text: 'Apa tautan dari web akademik yang sering dipakai untuk mengisi KRS? (Contoh: google.com)',
      type: 'TEXT',
      options: JSON.stringify('[{"value":"null"}]'),
      correct_answers: JSON.stringify('[{"value":"siak.ust.ac.id"}]')
    }
  })

  await prisma.question.create({
    data: {
      text: 'Apa singkatan dari Universitas Katolik Santo Thomas yang sering beredar?',
      type: 'RADIO',
      options: JSON.stringify('[{"value":"UST"},{"value":"UKST"},{"value":"UNIKA"},{"value":"UNIKA ST"}]'),
      correct_answers: JSON.stringify('[{"value":"unika"}]')
    }
  })

  await prisma.question.create({
    data: {
      text: 'Apa maksud dari jam CD?',
      type: 'RADIO',
      options: JSON.stringify(
        '[{"value":"Waktu belajar mengajar dari jam 09.50 - 11.30"},{"value":"Waktu belajar mengajar dari jam 10.40 - 12.20"},{"value":"Waktu istirahat"},{"value":"Waktu doa bersama"}]'
      ),
      correct_answers: JSON.stringify('[{"value":"waktu belajar mengajar dari jam 09.50 - 11.30"}]')
    }
  })
}

async function main() {
  superAdminSeed()
  defaultQuestionSeed()
  questionSeed()
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

// run this command: npx tsx prisma/seed.ts
