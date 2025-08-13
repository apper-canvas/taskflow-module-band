import { motion } from "framer-motion"
import ProgressRing from "@/components/molecules/ProgressRing"
import ApperIcon from "@/components/ApperIcon"
import { calculateProgress } from "@/utils/taskHelpers"

const TaskHeader = ({ tasks, totalTasks }) => {
  const completedTasks = tasks.filter(task => task.completed).length
  const progress = calculateProgress(tasks)
  
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  })

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good morning!"
    if (hour < 17) return "Good afternoon!"
    return "Good evening!"
  }

  const getMotivationalMessage = () => {
    if (progress === 100) {
      return "🎉 All tasks completed! You're amazing!"
    } else if (progress >= 75) {
      return "🚀 Almost there! You're doing great!"
    } else if (progress >= 50) {
      return "💪 Keep up the momentum!"
    } else if (progress > 0) {
      return "✨ Great start! Keep going!"
    } else {
      return "🌟 Ready to conquer your day?"
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 rounded-2xl p-6 mb-8"
    >
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <motion.h1 
            className="text-3xl font-bold text-gray-900 font-display"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
          >
            {getGreeting()}
          </motion.h1>
          
          <p className="text-gray-600 text-lg">
            {currentDate}
          </p>
          
          <motion.p 
            key={progress} // Re-animate when progress changes
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-primary font-semibold text-lg"
          >
            {getMotivationalMessage()}
          </motion.p>
        </div>

        <div className="flex items-center gap-8">
          {/* Stats */}
          <div className="hidden sm:flex items-center gap-6 text-center">
            <div className="space-y-1">
              <motion.div 
                className="text-2xl font-bold text-gray-900"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                {completedTasks}
              </motion.div>
              <div className="text-sm text-gray-600">
                Completed
              </div>
            </div>
            
            <div className="w-px h-12 bg-gray-200"></div>
            
            <div className="space-y-1">
              <motion.div 
                className="text-2xl font-bold text-gray-900"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                {tasks.filter(task => !task.completed).length}
              </motion.div>
              <div className="text-sm text-gray-600">
                Remaining
              </div>
            </div>
          </div>

          {/* Progress Ring */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
          >
            <ProgressRing 
              progress={progress} 
              size={80} 
              strokeWidth={6}
            />
          </motion.div>
        </div>
      </div>

      {/* Mobile Stats */}
      <div className="sm:hidden flex items-center justify-center gap-6 mt-4 pt-4 border-t border-gray-200">
        <div className="text-center">
          <div className="text-xl font-bold text-gray-900">
            {completedTasks}
          </div>
          <div className="text-sm text-gray-600">
            Completed
          </div>
        </div>
        
        <div className="text-center">
          <div className="text-xl font-bold text-gray-900">
            {tasks.filter(task => !task.completed).length}
          </div>
          <div className="text-sm text-gray-600">
            Remaining
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default TaskHeader