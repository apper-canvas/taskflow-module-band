import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "react-toastify"
import Checkbox from "@/components/atoms/Checkbox"
import Badge from "@/components/atoms/Badge"
import Button from "@/components/atoms/Button"
import TaskForm from "@/components/organisms/TaskForm"
import ApperIcon from "@/components/ApperIcon"
import { formatDueDate, getDueDateColor, isOverdue } from "@/utils/dateHelpers"
import { getCategoryColor } from "@/utils/taskHelpers"

const TaskItem = ({ task, onUpdate, onDelete, onToggleComplete }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [showActions, setShowActions] = useState(false)

  const handleToggleComplete = async () => {
    try {
      await onToggleComplete(task.Id, !task.completed)
      
      if (!task.completed) {
        // Show completion animation and celebration
        toast.success(`Great job! "${task.title}" completed! 🎉`, {
          className: "confetti"
        })
      }
    } catch (error) {
      console.error("Failed to toggle task completion:", error)
      toast.error("Failed to update task. Please try again.")
    }
  }

  const handleEdit = () => {
    setIsEditing(true)
    setShowActions(false)
  }

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await onDelete(task.Id)
        toast.success("Task deleted successfully")
      } catch (error) {
        console.error("Failed to delete task:", error)
        toast.error("Failed to delete task. Please try again.")
      }
    }
    setShowActions(false)
  }

  const handleSave = (updatedTask) => {
    onUpdate(updatedTask)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <TaskForm
        task={task}
        onSave={handleSave}
        onCancel={handleCancel}
        isEditing={true}
      />
    )
  }

  const dueDateFormatted = formatDueDate(task.dueDate)
  const dueDateColor = getDueDateColor(task.dueDate)
  const isTaskOverdue = isOverdue(task.dueDate)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -300, scale: 0.8 }}
      whileHover={{ scale: 1.01 }}
      className={`card p-4 transition-all duration-200 ${
        task.completed ? "opacity-75 bg-gray-50" : "bg-white hover:shadow-card-hover"
      }`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="flex items-start gap-3">
        <Checkbox
          checked={task.completed}
          onChange={handleToggleComplete}
          className="mt-0.5"
        />

        <div className="flex-1 min-w-0">
          <h3 className={`font-medium text-gray-900 leading-snug ${
            task.completed ? "line-through text-gray-500" : ""
          }`}>
            {task.title}
          </h3>

          <div className="flex items-center gap-2 mt-2 flex-wrap">
            {task.priority && (
              <Badge variant={task.priority} size="sm">
                {task.priority}
              </Badge>
            )}

            {task.category && (
              <Badge 
                size="sm"
                className={`${getCategoryColor(task.category)} border-0`}
              >
                <ApperIcon name="Tag" size={12} className="mr-1" />
                {task.category}
              </Badge>
            )}

            {dueDateFormatted && (
              <Badge
                size="sm"
                variant={isTaskOverdue ? "error" : "default"}
                className={`${dueDateColor} border-0 ${
                  isTaskOverdue ? "bg-red-100 text-red-800" : ""
                }`}
              >
                <ApperIcon name="Calendar" size={12} className="mr-1" />
                {dueDateFormatted}
              </Badge>
            )}
          </div>
        </div>

        <AnimatePresence>
          {showActions && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="flex gap-1"
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={handleEdit}
                className="p-2 text-gray-500 hover:text-primary"
              >
                <ApperIcon name="Edit2" size={14} />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDelete}
                className="p-2 text-gray-500 hover:text-red-600"
              >
                <ApperIcon name="Trash2" size={14} />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default TaskItem