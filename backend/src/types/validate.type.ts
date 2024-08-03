export interface IValidateUser {
  user_id: string
  file: string
  role: string
  photo: string
  is_valid?: boolean
  note?: string
}

export interface IValidateUpdatePayload {
  isValid: boolean
  note?: string
}
