import {
  createMemberFn,
  getMemberFn,
  getMemberLoginFn,
  getMembersFn,
  getRequestedMembersFn,
  kickMemberFn,
  reportMemberFn,
  updateMemberStatusFn,
  updateRoleMemberFn
} from '@/api/member.api'
import { toast } from '@/components/ui/use-toast'
import { useMutation, useQuery, useQueryClient } from 'react-query'

export const useGetMembers = (forumId: string) => {
  return useQuery('members', () => getMembersFn(forumId), {
    select: (data) => {
      const moderators = data.filter((member) => member.role === 'MODERATOR')
      const admin = data.find((member) => member.role === 'ADMIN')

      return {
        data,
        moderators,
        admin
      }
    }
  })
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

export const useGetRequestedMembers = (forumId: string) => {
  return useQuery(['members', forumId, 'requested'], () => getRequestedMembersFn(forumId))
}

export const useCreateMember = () => {
  const queryClient = useQueryClient()
  return useMutation(createMemberFn, {
    onSuccess: () => {
      queryClient.invalidateQueries('members')
      toast({
        title: 'Anggota berhasil ditambahkan',
        description: 'Anggota berhasil ditambahkan pada forum ini'
      })
    }
  })
}

export const useUpdateMemberStatus = () => {
  const queryClient = useQueryClient()
  return useMutation(updateMemberStatusFn, {
    onSuccess: () => {
      queryClient.invalidateQueries('members')
      toast({
        title: 'Pengguna berhasil ditambahkan',
        description: 'Pengguna tersebut berhasil ditambahkan menjadi anggota pada forum ini'
      })
    }
  })
}
