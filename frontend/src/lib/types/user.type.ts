export type UserType = {
  id: string
  fullname: string
  username: string
  email: string
  photo?: string
  provider?: string
  _count: {
    forums: number
    joined_forum: number
  }
}
