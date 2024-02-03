import * as Yup from 'yup'

export const editUserValidation = Yup.object({
  fullname: Yup.string().required('Nama lengkap wajib diisi'),
  username: Yup.string().required('Username wajib diisi')
})

export type EditUserType = Yup.InferType<typeof editUserValidation>

export const changePasswordValidation = Yup.object({
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

export type ChangePasswordType = Yup.InferType<typeof changePasswordValidation>

export const updateEmailValidation = Yup.object({
  email: Yup.string().email('Email tidak valid').required('Email wajib diisi')
})

export type UpdateEmailType = Yup.InferType<typeof updateEmailValidation>
