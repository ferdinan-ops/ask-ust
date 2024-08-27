import * as Yup from 'yup'

export type ForumInputType = {
  title?: string
  image?: File[]
  privacy?: string
  description: string
}

export const addForumValidation = Yup.object({
  title: Yup.string().required('Judul harus diisi'),
  description: Yup.string().required('Deskripsi harus diisi'),
  privacy: Yup.string().required('Tipe privasi harus diisi'),
  image: Yup.mixed()
})

export type AddForumType = Yup.InferType<typeof addForumValidation>

export const updateForumValidation = Yup.object({
  description: Yup.string().required('Deskripsi harus diisi'),
  image: Yup.mixed()
})

export type UpdateForumType = Yup.InferType<typeof updateForumValidation>
