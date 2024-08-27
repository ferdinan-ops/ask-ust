import { type Request, type Response } from 'express'
import * as SearchService from '../services/search.service'
import { logInfo } from '../utils/logger'

export const searchForum = async (req: Request, res: Response) => {
  const { q } = req.query
  const search = (q as string) ?? ''

  try {
    const data = await SearchService.getForumByKeyword(search, req.userId as string)

    logInfo(req, 'Searching forum')
    res.status(200).json({
      message: 'Berhasil menampilkan hasil pencarian forum',
      data
    })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const searchMember = async (req: Request, res: Response) => {
  const { q } = req.query
  const search = (q as string) ?? ''

  try {
    const data = await SearchService.getMemberByKeyword(search, req.params?.forumId)

    logInfo(req, 'Searching member')
    res.status(200).json({
      message: 'Berhasil menampilkan hasil pencarian member',
      data
    })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const searchUser = async (req: Request, res: Response) => {
  const { q } = req.query
  const search = (q as string) ?? ''

  try {
    const data = await SearchService.getUserByKeyword(search)

    logInfo(req, 'Searching user')
    res.status(200).json({
      message: 'Berhasil menampilkan hasil pencarian user',
      data
    })
  } catch (error) {
    res.status(500).json({ error })
  }
}
