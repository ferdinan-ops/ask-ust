export type UserType = {
  id: string
  fullname: string
  username: string
  email: string
  photo?: string
  provider?: string
}

export type UserForumCountType = {
  my_forum: number
  joined_forum: number
}
