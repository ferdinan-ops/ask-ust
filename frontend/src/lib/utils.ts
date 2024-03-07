import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const bytesToSize = (bytes: number): string => {
  const sizes: string[] = ['Bytes', 'KB', 'MB', 'GB', 'TB']

  if (bytes === 0) return '0 Byte'

  const i: number = parseInt(String(Math.floor(Math.log(bytes) / Math.log(1024))))
  return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + ' ' + sizes[i]
}

export const formatDate = (date: string, type: 'with-hour' | 'without-hour' = 'without-hour') => {
  // Membuat objek Date dari string
  const tanggalObjek = new Date(date)

  // Mendapatkan tanggal, bulan, dan tahun dari objek Date
  const tanggal = tanggalObjek.getDate()
  const bulan = tanggalObjek.getMonth() // Ingat bahwa bulan dimulai dari 0 (Januari = 0)
  const tahun = tanggalObjek.getFullYear()

  // Array untuk nama bulan
  const namaBulan = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember'
  ]

  // Mendapatkan nama bulan dari array
  const namaBulanStr = namaBulan[bulan]
  const hours = ('0' + tanggalObjek.getHours()).slice(-2)
  const minutes = ('0' + tanggalObjek.getMinutes()).slice(-2)

  // Format output
  const withoutHour = tanggal + ' ' + namaBulanStr + ' ' + tahun
  const withHour = `${withoutHour}, ${hours}:${minutes}`

  return type === 'with-hour' ? withHour : withoutHour
}
