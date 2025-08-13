import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"

const Error = ({ message = "Something went wrong", onRetry }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-12 px-6 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring" }}
        className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6"
      >
        <ApperIcon name="AlertTriangle" size={32} className="text-red-600" />
      </motion.div>
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="space-y-4"
      >
        <h3 className="text-xl font-semibold text-gray-800 font-display">
          Oops! Something went wrong
        </h3>
        
        <p className="text-gray-600 max-w-md">
          {message}. Don't worry, your tasks are safe and we're working to fix this.
        </p>
        
        {onRetry && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onRetry}
            className="btn btn-primary mt-6"
          >
            <ApperIcon name="RotateCcw" size={16} className="mr-2" />
            Try Again
          </motion.button>
        )}
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-sm text-gray-500"
      >
        If this problem persists, please refresh the page or contact support.
      </motion.div>
    </motion.div>
  )
}

export default Error