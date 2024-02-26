import { HiEye, HiEyeSlash } from 'react-icons/hi2'
import * as React from 'react'

import { Button } from '../../ui/button'
import { Input, InputProps } from '../../ui/input'

import { cn } from '@/lib/utils'

const Password = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  const [showPassword, setShowPassword] = React.useState(false)
  return (
    <div className="relative">
      <Input
        {...props}
        ref={ref}
        className={cn(className)}
        autoComplete="on"
        type={showPassword ? 'text' : 'password'}
      />
      <Button
        type="button"
        variant="ghost"
        className="absolute right-0 top-1/2 mr-2 h-7 w-7 -translate-y-1/2 rounded-lg p-0 text-[#8897AD] hover:text-[#8897AD]"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <HiEyeSlash className="m-auto" /> : <HiEye className="m-auto" />}
      </Button>
    </div>
  )
})

export default Password
