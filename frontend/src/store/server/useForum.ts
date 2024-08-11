import { useMutation, useQuery, useQueryClient } from 'react-query'
import { toast } from '@/components/ui/use-toast'
import { AxiosError } from 'axios'

import {
  addForumFn,
  deleteForumByIdFn,
  getForumByIdFn,
  getForumConclusionFn,
  getForumsFn,
  joinForumFn,
  joinForumWithInviteCodeFn,
  leaveForumFn,
  updateForumByIdFn,
  updateForumTypeFn
} from '@/api/forum.api'

import { handleOnError } from '@/lib/services/handleToast'
import { MetaParamsType } from '@/lib/types/pagination.type'

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

export const useGetForums = ({ search, page, filter }: MetaParamsType & { filter?: string }) => {
  return useQuery(['forums', search, page, filter], async () => await getForumsFn({ page, search, filter }))
}

export const useGetDetailForum = (forumId: string) => {
  return useQuery([`forums`, forumId], async () => await getForumByIdFn(forumId), {
    enabled: !!forumId,
    select: (data) => {
      if (data.members) {
        return {
          ...data,
          moderators: data.members.filter((member) => member.role === 'MODERATOR'),
          admin: data.members.find((member) => member.role === 'ADMIN')
        }
      }

      return {
        ...data,
        moderators: [],
        admin: {}
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
    onSuccess: () => {
      queryClient.invalidateQueries(`forums`)
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
    onSuccess: () => {
      queryClient.invalidateQueries(`forums`)
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
    onSuccess: () => {
      queryClient.invalidateQueries('joined-forums')
      queryClient.invalidateQueries(`forums`)
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
    onSuccess: () => {
      queryClient.invalidateQueries('joined-forums')
      queryClient.invalidateQueries(`forums`)

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
    onSuccess: () => {
      queryClient.invalidateQueries(`forums`)
      toast({
        title: 'Anda berhasil bergabung',
        description: 'Anda berhasil bergabung dengan forum ini'
      })
    }
  })
}

export const useUpdateForumType = () => {
  const queryClient = useQueryClient()
  return useMutation(updateForumTypeFn, {
    onError: (error: AxiosError) => {
      handleOnError(error)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(`forums`)
      toast({
        title: 'Tipe Publikasi Forum berhasil diubah',
        description: 'Tipe Publikasi Forum berhasil diubah di sistem. Ini akan diberitahukan kepada pemilik forum.'
      })
    }
  })
}

export const useGetForumConclusion = (forumId: string) => {
  // return useMutation(getForumConclusionFn, {
  //   onSuccess: (data) => {
  //     console.log(data)
  //   }
  // })
  return useQuery('forum-conclusion', async () => await getForumConclusionFn(forumId), {
    enabled: !!forumId,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: 1,
    staleTime: 30 * 60 * 1000 // 30 minutes
  })
}
