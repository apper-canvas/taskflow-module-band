import { forwardRef } from "react"
import { motion } from "framer-motion"
import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"

const Checkbox = forwardRef(({ 
  className, 
  checked = false,
  onChange,
  ...props 
}, ref) => {
  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={() => onChange?.(!checked)}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "relative w-5 h-5 border-2 rounded transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-1",
        checked 
          ? "bg-primary border-primary text-white" 
          : "bg-white border-gray-300 hover:border-gray-400",
        className
      )}
      {...props}
    >
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: checked ? 1 : 0, 
          opacity: checked ? 1 : 0 
        }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <ApperIcon name="Check" size={12} className="text-white" />
      </motion.div>
    </motion.button>
  )
})

Checkbox.displayName = "Checkbox"

export default Checkbox