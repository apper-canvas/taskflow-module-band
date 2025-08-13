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
    ? "border-red-300 focus:border-red-500 focus:ring-red-200" 
    : "border-gray-300 focus:border-primary focus:ring-primary/20 hover:border-gray-400"
  
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