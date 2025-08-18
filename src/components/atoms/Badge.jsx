import { forwardRef } from "react"
import { cn } from "@/utils/cn"

const Badge = forwardRef(({ 
  children, 
  className, 
  variant = "default",
  size = "md",
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center font-medium rounded-full border"
  
  const variants = {
default: "bg-gray-50 text-gray-600 border-gray-200",
    primary: "bg-primary/5 text-primary border-primary/15",
    secondary: "bg-gray-50 text-gray-500 border-gray-200",
    accent: "bg-accent/5 text-accent border-accent/15",
    success: "bg-green-50 text-green-700 border-green-200",
    warning: "bg-amber-50 text-amber-700 border-amber-200",
    error: "bg-red-50 text-red-700 border-red-200",
    high: "bg-red-50 text-red-700 border-red-200",
    medium: "bg-amber-50 text-amber-700 border-amber-200",
    low: "bg-green-50 text-green-700 border-green-200"
  }
  
  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-xs",
    lg: "px-3 py-1.5 text-sm"
  }
  
  return (
    <span
      ref={ref}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </span>
  )
})

Badge.displayName = "Badge"

export default Badge