import {
  addForumFn,
  deleteForumByIdFn,
  getForumByIdFn,
  getForumsFn,
  joinForumFn,
  joinForumWithInviteCodeFn,
  leaveForumFn,
  updateForumByIdFn
} from '@/api/forum.api'
import { toast } from '@/components/ui/use-toast'
import { handleOnError } from '@/lib/services/handleToast'
import { AxiosError } from 'axios'
import { useMutation, useQuery, useQueryClient } from 'react-query'

export const useCreateForum = () => {
  const queryClient = useQueryClient()
  return useMutation(addForumFn, {
    onError: (error: AxiosError) => {
      handleOnError(error)
    },
    onSuccess: () => {
      queryClient.invalidateQueries('forums')
      toast({
        title: 'Forum berhasil dibuat',
        description: 'Forum anda berhasil dibuat dan dapat dilihat oleh semua orang'
      })
    }
  })
}

export const useGetForum = (page: number) => {
  return useQuery('forums', async () => await getForumsFn(page))
}

export const useGetDetailForum = (forumId: string) => {
  return useQuery(['forums', forumId], async () => await getForumByIdFn(forumId), {
    enabled: !!forumId,
    select: (data) => {
      return {
        ...data,
        moderators: data.members.filter((member) => member.role === 'MODERATOR'),
        admin: data.members.find((member) => member.role === 'ADMIN')
      }
    }
  })
}

export const useUpdateForum = () => {
  const queryClient = useQueryClient()
  return useMutation(updateForumByIdFn, {
    onError: (error: AxiosError) => {
      handleOnError(error)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(['forums', data.id])
      toast({
        title: 'Forum berhasil diupdate',
        description: 'Forum anda berhasil diupdate dan dapat dilihat oleh semua orang'
      })
    }
  })
}

export const useDeleteForum = () => {
  const queryClient = useQueryClient()
  return useMutation(deleteForumByIdFn, {
    onError: (error: AxiosError) => {
      handleOnError(error)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(['forums', data.id])
      toast({
        title: 'Forum berhasil dihapus',
        description: 'Forum anda berhasil dihapus secara permanen dari sistem'
      })
    }
  })
}

export const useJoinForum = () => {
  const queryClient = useQueryClient()
  return useMutation(joinForumFn, {
    onError: (error: AxiosError) => {
      handleOnError(error)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries('joined-forums')
      queryClient.invalidateQueries(['forums', data.id])
      toast({
        title: 'Anda berhasil bergabung',
        description: 'Anda berhasil bergabung dengan forum ini'
      })
    }
  })
}

export const useLeaveForum = () => {
  const queryClient = useQueryClient()
  return useMutation(leaveForumFn, {
    onError: (error: AxiosError) => {
      handleOnError(error)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries('joined-forums')
      queryClient.invalidateQueries(['forums', data.id])

      toast({
        title: 'Anda berhasil keluar',
        description: 'Anda berhasil keluar dari forum ini'
      })
    }
  })
}

export const useInviteCodeForum = () => {
  const queryClient = useQueryClient()
  return useMutation(joinForumWithInviteCodeFn, {
    onError: (error: AxiosError) => {
      handleOnError(error)
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(['forums', data.id])
      toast({
        title: 'Anda berhasil bergabung',
        description: 'Anda berhasil bergabung dengan forum ini'
      })
    }
  })
}
