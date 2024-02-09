export type ReportType = {
  id: string
  report_category: ReportCategory
  member_id: string
  forum_id: string
  created_at: string
  updated_at: string
}

type ReportCategory =
  | 'POST_PERSONAL_INFORMATION'
  | 'ONLINE_HARASSMENT'
  | 'HATEFUL_BEHAVIOR'
  | 'THREAT_OF_VIOLENCE'
  | 'SELF_HARM'
  | 'SPAM'
