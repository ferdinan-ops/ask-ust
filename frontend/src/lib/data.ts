import {
  // HiOutlineBell,
  HiOutlineBookOpen,
  HiOutlineCog6Tooth,
  HiOutlineInbox,
  HiOutlineSquares2X2,
  HiOutlineUser,
  HiOutlineUserGroup
} from 'react-icons/hi2'

export const MAIN_MENU = [
  {
    href: '/dashboard',
    title: 'Dashboard',
    icon: HiOutlineSquares2X2
  },
  {
    href: '/forums',
    title: 'Forum',
    icon: HiOutlineInbox
  },
  {
    href: '/me',
    title: 'Profil',
    icon: HiOutlineUser
  }
]

export const MENU_FORUMS = [
  {
    href: '/forums/teknologi',
    name: 'Teknologi'
  },
  {
    href: '/forums/olahraga',
    name: 'Olahraga'
  },
  {
    href: '/forums/musik',
    name: 'Musik'
  },
  {
    href: '/forums/gaming',
    name: 'Gaming'
  },
  {
    href: '/forums/sosial',
    name: 'Sosial'
  }
]

export const MEMBERS = [
  'Aldi Hutahayan',
  'Budi Setiawan',
  'Caca Marica',
  'Dedi Kurniawan',
  'Eko Prasetyo',
  'Fajar Setiawan',
  'Gina Mariana',
  'Hadi Setiawan',
  'Indra Gunawan',
  'Joko Susilo',
  'Kurnia Setiawan',
  'Linda Mariana',
  'Mega Susanti',
  'Nana Mariana'
]

export const headerLinks = [
  { to: '/admin/validate', label: 'Daftar Pengguna', icon: HiOutlineUserGroup, type: 'admin' },
  // { to: '/admin/forum', label: 'Daftar Forum', icon: HiOutlineInbox, type: 'admin' },
  { to: '/admin/questions', label: 'Pertanyaan Kuis', icon: HiOutlineBookOpen, type: 'admin' },
  // { to: '/admin/notification', label: 'Notifikasi', icon: HiOutlineBell, type: 'admin' },
  { to: '/admin/settings', label: 'Pengaturan', icon: HiOutlineCog6Tooth, type: 'admin' },
  { to: '/dashboard', label: 'Dashboard', icon: HiOutlineSquares2X2, type: 'user' },
  { to: '/forums', label: 'Forum', icon: HiOutlineInbox, type: 'user' },
  { to: '/me', label: 'Profil', icon: HiOutlineUser, type: 'user' }
]

export const filterItems = [
  { label: 'Semua', value: 'all' },
  { label: 'Valid', value: 'valid' },
  { label: 'Tidak valid', value: 'invalid' },
  { label: 'Belum divalidasi', value: 'pending' }
]

export const filterForumType = [
  { label: 'Semua', value: 'all' },
  { label: 'Publik', value: 'PUBLIC' },
  { label: 'Belum divalidasi', value: 'PENDING' },
  { label: 'Dilarang', value: 'RESTRICTED' }
]

export const forumCategories = [
  { label: 'Regular (Biasa)', value: 'REGULAR' },
  { label: 'Budaya', value: 'CULTURE' },
  { label: 'Sains', value: 'SCIENCE' },
  { label: 'Ilmu pengetahuan', value: 'KNOWLEDGE' }
]
