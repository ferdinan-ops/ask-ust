import {
  getMemberFn,
  getMemberLoginFn,
  getMembersFn,
  kickMemberFn,
  reportMemberFn,
  updateRoleMemberFn
} from '@/api/member.api'
import { toast } from '@/components/ui/use-toast'
import { useMutation, useQuery, useQueryClient } from 'react-query'

export const useGetMembers = (forumId: string) => {
  return useQuery('members', () => getMembersFn(forumId))
}

export const useGetMember = (memberId: string) => {
  return useQuery(['members', memberId], () => getMemberFn(memberId))
}

export const useUpdateMember = () => {
  const queryClient = useQueryClient()
  return useMutation(updateRoleMemberFn, {
    onSuccess: () => {
      queryClient.invalidateQueries('members')
      toast({
        title: 'Role dari anggota berhasil diubah',
        description: 'Role dari anggota berhasil diubah pada forum ini'
      })
    }
  })
}

export const useKickMember = () => {
  const queryClient = useQueryClient()
  return useMutation(kickMemberFn, {
    onSuccess: () => {
      queryClient.invalidateQueries('members')
      toast({
        title: 'Anggota berhasil dihapus',
        description: 'Anggota berhasil dihapus dari forum ini'
      })
    }
  })
}

export const useReportMember = () => {
  const queryClient = useQueryClient()
  return useMutation(reportMemberFn, {
    onSuccess: () => {
      queryClient.invalidateQueries('members')
      toast({
        title: 'Laporan berhasil dikirim',
        description: 'Laporan berhasil dikirim ke admin forum'
      })
    }
  })
}

export const useGetMemberLogin = (forumId: string) => {
  return useQuery(['member', forumId], () => getMemberLoginFn(forumId))
}
