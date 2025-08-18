import { forwardRef } from "react"
import { motion } from "framer-motion"
import { cn } from "@/utils/cn"

const Button = forwardRef(({ 
  children, 
  className, 
  variant = "primary", 
  size = "md", 
  disabled = false,
  loading = false,
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50"
  
const variants = {
    primary: "bg-gradient-to-r from-primary to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white shadow-sm hover:shadow-md",
    secondary: "bg-gray-50 hover:bg-gray-100 text-gray-600 border border-gray-200 hover:border-gray-300",
    accent: "bg-gradient-to-r from-accent to-accent-600 hover:from-accent-600 hover:to-purple-600 text-white shadow-sm hover:shadow-md",
    outline: "border border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-gray-400",
    ghost: "text-gray-500 hover:text-gray-700 hover:bg-gray-50",
    danger: "bg-red-500 hover:bg-red-600 text-white shadow-sm"
  }
  
  const sizes = {
    sm: "px-3 py-1.5 text-sm rounded-lg",
    md: "px-4 py-2 text-sm rounded-lg",
    lg: "px-6 py-3 text-base rounded-xl",
    xl: "px-8 py-4 text-lg rounded-xl"
  }
  
  const classes = cn(
    baseStyles,
    variants[variant],
    sizes[size],
    className
  )
  
  return (
    <motion.button
      ref={ref}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      disabled={disabled || loading}
      className={classes}
      {...props}
    >
      {loading && (
        <div className="mr-2 w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
      )}
      {children}
    </motion.button>
  )
})

Button.displayName = "Button"

export default Button