import { forwardRef } from "react"
import { cn } from "@/utils/cn"

const Select = forwardRef(({ 
  className, 
  children,
  error = false,
  ...props 
}, ref) => {
  const baseStyles = "w-full px-4 py-2.5 border rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed bg-white appearance-none"
  
const styles = error 
    ? "border-red-200 focus:border-red-400 focus:ring-red-100" 
    : "border-gray-200 focus:border-primary focus:ring-primary/15 hover:border-gray-300"
  
  return (
    <div className="relative">
      <select
        ref={ref}
        className={cn(baseStyles, styles, className)}
        {...props}
      >
        {children}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  )
})

Select.displayName = "Select"

export default Select