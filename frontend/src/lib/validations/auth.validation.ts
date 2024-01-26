import * as Yup from 'yup'

export const registerValidation = Yup.object({
  fullname: Yup.string().required('Nama lengkap harus diisi'),
  username: Yup.string().required('Username harus diisi'),
  email: Yup.string().email('Email tidak valid').required('Email harus diisi'),
  password: Yup.string()
    .required('Kata sandi harus diisi')
    .min(8, 'Harus lebih dari 8 karakter')
    .matches(/[a-z]/g, 'Harus mengandung setidaknya 1 huruf kecil')
    .matches(/[A-Z]/g, 'Harus mengandung setidaknya 1 huruf besar')
    .matches(/[0-9]/g, 'Harus mengandung setidaknya 1 angka')
    .matches(/^\S*$/g, 'Tidak boleh mengandung spasi'),
  confirmPassword: Yup.string()
    .required('Konfirmasi kata sandi harus diisi')
    .oneOf([Yup.ref('password')], 'Kata sandi harus cocok')
})

export type RegisterType = Yup.InferType<typeof registerValidation>

export const verifyEmailValidation = Yup.object({
  token: Yup.string().required('Kode verifikasi harus diisi')
})

export type VerifyEmailType = Yup.InferType<typeof verifyEmailValidation>

export const loginValidation = Yup.object({
  email: Yup.string().email('Email tidak valid').required('Email harus diisi'),
  password: Yup.string().required('Kata sandi harus diisi')
})

export type LoginType = Yup.InferType<typeof loginValidation>
