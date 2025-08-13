import { motion } from "framer-motion"
import ApperIcon from "@/components/ApperIcon"

const Empty = ({ 
  title = "No tasks yet", 
  description = "Create your first task to get started with TaskFlow",
  actionText = "Add Task",
  onAction 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-6 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="relative mb-8"
      >
        <div className="w-24 h-24 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl flex items-center justify-center">
          <ApperIcon name="CheckCircle2" size={40} className="text-primary" />
        </div>
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          className="absolute -top-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center"
        >
          <ApperIcon name="Plus" size={16} className="text-white" />
        </motion.div>
      </motion.div>
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="space-y-4 max-w-md"
      >
        <h3 className="text-2xl font-bold text-gray-800 font-display">
          {title}
        </h3>
        
        <p className="text-gray-600 leading-relaxed">
          {description}
        </p>
        
        {onAction && (
          <motion.button
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, type: "spring" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onAction}
            className="btn btn-primary mt-8 px-8 py-3 text-base font-semibold"
          >
            <ApperIcon name="Plus" size={18} className="mr-2" />
            {actionText}
          </motion.button>
        )}
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-12 grid grid-cols-3 gap-6 text-sm text-gray-500"
      >
        <div className="flex flex-col items-center gap-2">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <ApperIcon name="Plus" size={16} className="text-green-600" />
          </div>
          <span>Add tasks</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <ApperIcon name="Tag" size={16} className="text-blue-600" />
          </div>
          <span>Organize</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <ApperIcon name="CheckCircle" size={16} className="text-purple-600" />
          </div>
          <span>Complete</span>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default Empty