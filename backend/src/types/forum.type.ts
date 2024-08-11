import { ForumCategory, ForumType } from '@prisma/client'

export interface IForum {
  title?: string
  category?: ForumCategory
  image?: string
  description: string
}

export interface IForumTypeUpdatePayload {
  note: string
  is_publish: ForumType
}
