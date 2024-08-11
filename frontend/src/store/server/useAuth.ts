import {
  forgotPasswordFn,
  loginFn,
  loginWithGoogleFn,
  logoutFn,
  registerFn,
  resetPasswordFn,
  verifyEmailFn
} from '@/api/auth.api'
import { toast } from '@/components/ui/use-toast'
import { handleOnError } from '@/lib/services/handleToast'

import { AxiosError } from 'axios'
import { useMutation, useQueryClient } from 'react-query'
import { useToken, useUserInfo } from '../client'

export const useRegister = () => {
  return useMutation(registerFn, {
    onError: (error: AxiosError) => {
      handleOnError(error)
    },
    onSuccess: () => {
      toast({
        title: 'Akun anda berhasil terdaftar',
        description: 'Silahkan cek email anda untuk melakukan verifikasi'
      })
    }
  })
}

export const useVerifyEmail = () => {
  return useMutation(verifyEmailFn, {
    onError: (error: AxiosError) => {
      handleOnError(error)
    },
    onSuccess: (data) => {
      useUserInfo.getState().setUser(data)
      toast({
        title: 'Email anda berhasil diverifikasi',
        description: 'Silahkan lengkapi berkas dan data diri anda untuk melanjutkan'
      })
    }
  })
}

export const useLogin = () => {
  return useMutation(loginFn, {
    onError: (error: AxiosError) => {
      handleOnError(error)
    },
    onSuccess: (data) => {
      if (data.access_token && data.refresh_token) {
        useToken.getState().storeAccessToken(data.access_token)
        useToken.getState().storeRefreshToken(data.refresh_token)
        useUserInfo.getState().setUser(data.user)
        toast({
          title: 'Login berhasil',
          description: 'Selamat datang di aplikasi kami'
        })
      } else {
        useUserInfo.getState().setUser(data.user)
        toast({
          title: 'Akun kamu berhasil terdaftar',
          description: `Selamat akun kamu berhasil terdaftar di aplikasi kami, ${
            data.user.validate ? 'Tunggu verifikasi dari admin' : 'silahkan lengkapi data diri kamu'
          }`
        })
      }
    }
  })
}

export const useLoginWithGoogle = () => {
  return useMutation(loginWithGoogleFn, {
    onError: (error: AxiosError) => {
      handleOnError(error)
    },
    onSuccess: (data) => {
      if (data.access_token && data.refresh_token) {
        useToken.getState().storeAccessToken(data.access_token)
        useToken.getState().storeRefreshToken(data.refresh_token)
        useUserInfo.getState().setUser(data.user)
        toast({
          title: 'Login berhasil',
          description: 'Selamat datang di aplikasi kami'
        })
      } else {
        useUserInfo.getState().setUser(data.user)
        toast({
          title: 'Akun google kamu berhasil terdaftar',
          description: `Selamat akun kamu berhasil terdaftar di aplikasi kami, ${
            data.user.validate ? 'Tunggu verifikasi dari admin' : 'silahkan lanjut proses pendaftaranya'
          }`
        })
      }
    }
  })
}

export const useLogout = () => {
  const queryClient = useQueryClient()
  return useMutation(logoutFn, {
    onError: (error: AxiosError) => {
      handleOnError(error)
    },
    onSuccess: () => {
      queryClient.clear()
      useToken.getState().removeAccessToken()
      useToken.getState().removeRefreshToken()
      useUserInfo.getState().removeUser()
      toast({
        title: 'Logout berhasil',
        description: 'Anda telah keluar dari aplikasi'
      })
    }
  })
}

export const useForgotPassword = () => {
  return useMutation(forgotPasswordFn, {
    onError: (error: AxiosError) => {
      handleOnError(error)
    },
    onSuccess: () => {
      toast({
        title: 'Email berhasil dikirim',
        description: 'Silahkan cek email anda untuk melakukan reset password'
      })
    }
  })
}

export const useResetPassword = () => {
  return useMutation(resetPasswordFn, {
    onError: (error: AxiosError) => {
      handleOnError(error)
    },
    onSuccess: () => {
      toast({
        title: 'Password berhasil direset',
        description: 'Silahkan login untuk melanjutkan'
      })
    }
  })
}
