import { getMembersCountFn, getReportsCountByForumFn, getReportsCountFn } from '@/api/dashboard.api'
import { useQuery } from 'react-query'

export const useGetReportsCount = () => {
  return useQuery('reportsCount', getReportsCountFn)
}

export const useGetMembersCount = () => {
  return useQuery('membersCount', getMembersCountFn)
}

export const useGetReportsCountByForum = (forumId: string) => {
  return useQuery(['reportsCountByForum', forumId], () => getReportsCountByForumFn(forumId), {
    select: (data) => {
      const SPAM = data?.filter((report) => report.report_category === 'SPAM').length
      const HATEFUL_BEHAVIOR = data?.filter((report) => report.report_category === 'HATEFUL_BEHAVIOR').length
      const ONLINE_HARASSMENT = data?.filter((report) => report.report_category === 'ONLINE_HARASSMENT').length
      const POST_PERSONAL_INFORMATION = data?.filter((report) => report.report_category === 'POST_PERSONAL_INFORMATION')
        .length
      const SELF_HARM = data?.filter((report) => report.report_category === 'SELF_HARM').length
      const THREAT_OF_VIOLENCE = data?.filter((report) => report.report_category === 'THREAT_OF_VIOLENCE').length

      return [
        {
          title: 'Memposting informasi pribadi',
          value: POST_PERSONAL_INFORMATION
        },
        {
          title: 'Pelecehan secara online',
          value: ONLINE_HARASSMENT
        },
        {
          title: 'Perilaku kebencian',
          value: HATEFUL_BEHAVIOR
        },
        {
          title: 'Ancaman kekerasan',
          value: THREAT_OF_VIOLENCE
        },
        {
          title: 'Mencelakai diri sendiri',
          value: SELF_HARM
        },
        {
          title: 'Spam',
          value: SPAM
        }
      ]
    }
  })
}
