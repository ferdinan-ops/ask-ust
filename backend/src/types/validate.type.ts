export interface IValidateUser {
  user_id: string
  file: string
  photo: string
  is_valid?: boolean
  note?: string
}

export interface IValidateUpdatePayload {
  userId: string
  isValid: boolean
  note?: string
}
