import { useSearchParams } from 'react-router-dom'

export interface ParamsType {
  key: string
  value: string
}

export default function useQueryParams<T extends string[]>(params: T) {
  const [searchParams, setSearchParams] = useSearchParams()

  const getAllParams = () => {
    const data: Record<string, string> = {}

    params.forEach((param) => {
      data[param] = searchParams.get(param) ?? ''
    })

    return data as Record<T[number], string>
  }

  const createParam = (params: ParamsType) => {
    searchParams.set(params.key, params.value)
    setSearchParams(searchParams, { replace: true })
  }

  const deleteParam = (param: string) => {
    const params = searchParams.get(param)
    if (params) {
      searchParams.delete(param)
      setSearchParams(searchParams.toString(), { replace: true })
    }
  }

  return {
    createParam,
    deleteParam,
    params: getAllParams()
  }
}
