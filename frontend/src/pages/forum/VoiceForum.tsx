import { Button } from '@/components/ui/button'
import { HiArrowRightOnRectangle, HiChatBubbleBottomCenterText, HiMicrophone } from 'react-icons/hi2'
import { FaUserAlt } from 'react-icons/fa'

export default function VoiceForum() {
  return (
    <section className="flex flex-col gap-7">
      <div className="grid min-h-[calc(100vh-68px-56px-40px-28px)] grid-cols-4 grid-rows-2 gap-4">
        {[...Array(8)].map((_, index) => (
          <div
            className="relative flex flex-1 overflow-hidden rounded-lg border-2 border-zinc-400 bg-zinc-100 ring-2 ring-zinc-300 dark:border-zinc-900 dark:bg-zinc-800 dark:ring-zinc-700"
            key={index}
          >
            <FaUserAlt className="m-auto h-1/2 w-1/2 text-zinc-300 dark:text-zinc-900" />
            <p className="absolute bottom-0 left-0 bg-primary/70 px-2 py-1 text-sm font-semibold text-white">
              John doe
            </p>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center gap-5">
        <Button variant="call" className="gap-2.5 bg-zinc-700">
          <HiMicrophone className="h-5 w-5" />
          <p>Microphone</p>
        </Button>
        <Button variant="call" className="gap-2.5 bg-zinc-700">
          <HiChatBubbleBottomCenterText className="h-5 w-5" />
          <p>Chat</p>
        </Button>
        <Button className="gap-2.5" variant="destructive">
          <HiArrowRightOnRectangle className="h-5 w-5" />
          <p>Leave</p>
        </Button>
      </div>
    </section>
  )
}
