import { motion, AnimatePresence } from "framer-motion"
import TaskItem from "@/components/organisms/TaskItem"
import Empty from "@/components/ui/Empty"

const TaskList = ({ 
  tasks, 
  onUpdateTask, 
  onDeleteTask, 
  onToggleComplete,
  onAddTask,
  loading = false 
}) => {
  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="card p-4 animate-pulse">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 bg-gray-200 rounded"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="flex gap-2">
                  <div className="h-3 bg-gray-200 rounded w-16"></div>
                  <div className="h-3 bg-gray-200 rounded w-20"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (tasks.length === 0) {
    return (
      <Empty
        title="No tasks found"
        description="Create your first task to get started with TaskFlow and boost your productivity!"
        actionText="Add Your First Task"
        onAction={onAddTask}
      />
    )
  }

  // Separate completed and incomplete tasks
  const incompleteTasks = tasks.filter(task => !task.completed)
  const completedTasks = tasks.filter(task => task.completed)

  return (
    <motion.div layout className="space-y-6">
      {/* Incomplete Tasks */}
      {incompleteTasks.length > 0 && (
        <div className="space-y-3">
          <AnimatePresence>
            {incompleteTasks.map((task) => (
              <TaskItem
                key={task.Id}
                task={task}
                onUpdate={onUpdateTask}
                onDelete={onDeleteTask}
                onToggleComplete={onToggleComplete}
              />
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Completed Tasks */}
      {completedTasks.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-3"
        >
          <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="px-2">
              Completed ({completedTasks.length})
            </span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>
          
          <AnimatePresence>
            {completedTasks.map((task) => (
              <TaskItem
                key={task.Id}
                task={task}
                onUpdate={onUpdateTask}
                onDelete={onDeleteTask}
                onToggleComplete={onToggleComplete}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </motion.div>
  )
}

export default TaskList