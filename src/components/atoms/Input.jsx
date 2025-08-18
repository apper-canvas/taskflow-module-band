import { forwardRef } from "react"
import { cn } from "@/utils/cn"

const Input = forwardRef(({ 
  className, 
  type = "text",
  error = false,
  ...props 
}, ref) => {
  const baseStyles = "w-full px-4 py-2.5 border rounded-lg transition-all duration-200 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed bg-white"
  
const styles = error 
    ? "border-red-200 focus:border-red-400 focus:ring-red-100" 
    : "border-gray-200 focus:border-primary focus:ring-primary/15 hover:border-gray-300"
  
  return (
    <input
      type={type}
      ref={ref}
      className={cn(baseStyles, styles, className)}
      {...props}
    />
  )
})

Input.displayName = "Input"

export default Input