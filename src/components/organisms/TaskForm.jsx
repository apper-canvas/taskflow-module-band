import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { taskService } from "@/services/api/taskService";
import ApperIcon from "@/components/ApperIcon";
import PrioritySelector from "@/components/molecules/PrioritySelector";
import CategorySelector from "@/components/molecules/CategorySelector";
import Select from "@/components/atoms/Select";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import { formatDateForInput } from "@/utils/dateHelpers";

const TaskForm = ({ task, onSave, onCancel, isEditing = false }) => {
const [formData, setFormData] = useState({
    title: task?.title || "",
    description: task?.description || "",
    priority: task?.priority || null,
    category: task?.category || null,
    status: task?.status || "active",
    dueDate: task?.dueDate ? formatDateForInput(task.dueDate) : ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [expanded, setExpanded] = useState(isEditing)
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.title.trim()) {
      toast.error("Task title is required")
      return
    }

    setIsSubmitting(true)

    try {
const taskData = {
        ...formData,
        title: formData.title.trim(),
        description: formData.description.trim(),
        status: formData.status,
        dueDate: formData.dueDate || null
      }

      let savedTask
      if (isEditing) {
        savedTask = await taskService.update(task.Id, taskData)
        toast.success("Task updated successfully!")
      } else {
        savedTask = await taskService.create(taskData)
        toast.success("Task created successfully!")
      }

      onSave(savedTask)
      
if (!isEditing) {
        setFormData({
          title: "",
          description: "",
          priority: null,
          category: null,
          status: "active",
          dueDate: ""
        })
        setExpanded(false)
      }
    } catch (error) {
      console.error("Failed to save task:", error)
      toast.error("Failed to save task. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleQuickAdd = (e) => {
    if (e.key === "Enter" && !e.shiftKey && !expanded) {
      e.preventDefault()
      if (formData.title.trim()) {
        setExpanded(true)
      }
    }
  }

  if (!expanded && !isEditing) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-4"
      >
        <div className="flex items-center gap-3">
          <ApperIcon name="Plus" size={20} className="text-primary" />
          <Input
            placeholder="Add a new task..."
            value={formData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            onKeyDown={handleQuickAdd}
            onFocus={() => setExpanded(true)}
            className="flex-1"
          />
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="card p-6"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Task Title
          </label>
          <Input
            id="title"
            type="text"
            placeholder="What needs to be done?"
            value={formData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            required
            autoFocus={!isEditing}
/>
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Enter task description..."
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all duration-200 resize-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
<div>
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">
              Priority
            </label>
            <PrioritySelector
              value={formData.priority}
              onChange={(value) => handleInputChange("priority", value)}
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <CategorySelector
              value={formData.category}
              onChange={(value) => handleInputChange("category", value)}
            />
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <Select
              id="status"
              value={formData.status}
              onChange={(e) => handleInputChange("status", e.target.value)}
              className="w-full"
            >
              <option value="active">Active</option>
              <option value="archived">Archived</option>
            </Select>
          </div>

          <div>
            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-2">
              Due Date
            </label>
            <Input
              id="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={(e) => handleInputChange("dueDate", e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          {!isEditing && (
            <Button
              type="button"
              variant="ghost"
              onClick={() => setExpanded(false)}
            >
              Cancel
            </Button>
          )}
          
          {isEditing && onCancel && (
            <Button
              type="button"
              variant="secondary"
              onClick={onCancel}
            >
              Cancel
            </Button>
          )}

          <Button
            type="submit"
            variant="primary"
            loading={isSubmitting}
          >
            <ApperIcon name="Save" size={16} className="mr-2" />
            {isEditing ? "Update Task" : "Create Task"}
          </Button>
        </div>
      </form>
    </motion.div>
  )
}

export default TaskForm