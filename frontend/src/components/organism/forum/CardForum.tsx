import { Link } from 'react-router-dom'

import { HiOutlineChatBubbleBottomCenterText, HiOutlinePaperClip } from 'react-icons/hi2'
import { ForumResponseType } from '@/lib/types/forum.type'
import { cn } from '@/lib/utils'

interface CardForumProps {
  forums: ForumResponseType
}

export default function CardForum({ forums }: CardForumProps) {
  return (
    <section className="grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
      {forums?.data.length !== 0 &&
        forums?.data.map((forum) => (
          <Link
            key={forum.id}
            to={`/forums/${forum.id}`}
            className="flex cursor-pointer flex-col gap-3 rounded-2xl bg-[#F7F9FB] p-6 hover:bg-[#eef0f2] dark:bg-white/5 hover:dark:bg-white/10"
          >
            <div className="flex flex-col gap-1">
              <h3 className="font-bold">{forum.title}</h3>
              <p className="truncate-2 text-xs font-medium text-black/40 dark:text-white/40">{forum.description}</p>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {forum.members.slice(0, 3).map((member, index) => (
                  <img
                    key={member.id}
                    alt="profile"
                    src={member.user.photo || 'https://github.com/shadcn.png'}
                    className={cn(
                      index !== 0 && '-ml-3',
                      'h-6 w-6 rounded-full border-2 border-[#F7F9FB] dark:border-black'
                    )}
                  />
                ))}
              </div>
              <div className="flex items-center gap-4 text-black/40 dark:text-white/40">
                <div className="flex items-center gap-1">
                  <HiOutlinePaperClip />
                  <span className="text-xs">6</span>
                </div>
                <div className="flex items-center gap-1.5 text-black/40 dark:text-white/40">
                  <HiOutlineChatBubbleBottomCenterText />
                  <span className="text-xs">19</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
    </section>
  )
}
