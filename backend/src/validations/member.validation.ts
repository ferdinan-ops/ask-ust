import Joi from 'joi'
import { type IReportMemberPayload, type IUpdateMemberPayload } from '../types/member.type'
import { ReportCategory } from '@prisma/client'

export const validUpdateMember = (payload: IUpdateMemberPayload) => {
  const schema = Joi.object<IUpdateMemberPayload>({
    role: Joi.string().valid('MODERATOR', 'GUEST').required(),
    forumId: Joi.string().required()
  })

  return schema.validate(payload)
}

export const validReportMember = (payload: IReportMemberPayload) => {
  const validReportCategory = Object.values(ReportCategory)

  const schema = Joi.object<IReportMemberPayload>({
    report_category: Joi.string()
      .valid(...validReportCategory)
      .required(),
    member_id: Joi.string().required(),
    forum_id: Joi.string().required()
  })

  return schema.validate(payload)
}
