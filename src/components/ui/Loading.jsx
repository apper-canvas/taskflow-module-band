import { motion } from "framer-motion"

const TaskSkeleton = () => (
  <div className="card p-4 space-y-3">
    <div className="flex items-center gap-3">
      <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
        <div className="flex gap-2">
          <div className="h-3 bg-gray-200 rounded animate-pulse w-16"></div>
          <div className="h-3 bg-gray-200 rounded animate-pulse w-20"></div>
          <div className="h-3 bg-gray-200 rounded animate-pulse w-12"></div>
        </div>
      </div>
    </div>
  </div>
)

const Loading = ({ count = 6 }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="h-8 bg-gray-200 rounded animate-pulse w-48 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-32"></div>
        </div>
        <div className="w-16 h-16 bg-gray-200 rounded-full animate-pulse"></div>
      </div>
      
      <div className="grid gap-4">
        {Array.from({ length: count }).map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <TaskSkeleton />
          </motion.div>
        ))}
      </div>
      
      <div className="text-center py-8">
        <div className="inline-flex items-center gap-2 text-gray-500">
          <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm font-medium">Loading tasks...</span>
        </div>
      </div>
    </motion.div>
  )
}

export default Loading