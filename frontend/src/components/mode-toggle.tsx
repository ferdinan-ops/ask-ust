import { Monitor, Moon, Sun } from 'lucide-react'

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

import { useTheme } from '@/components/theme-provider'

export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full border-none focus:outline-none dark:bg-primary">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('light')} className="items-center gap-1 font-semibold">
          <Sun className="mr-2 h-4 w-4" />
          <p>Light</p>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')} className="items-center gap-1 font-semibold">
          <Moon className="mr-2 h-4 w-4" />
          <p>Dark</p>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')} className="items-center gap-1 font-semibold">
          <Monitor className="mr-2 h-4 w-4" />
          <p>System</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
