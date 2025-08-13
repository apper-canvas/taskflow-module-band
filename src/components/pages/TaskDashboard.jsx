import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import TaskHeader from "@/components/organisms/TaskHeader"
import TaskForm from "@/components/organisms/TaskForm"
import TaskList from "@/components/organisms/TaskList"
import SearchBar from "@/components/molecules/SearchBar"
import FilterControls from "@/components/molecules/FilterControls"
import Button from "@/components/atoms/Button"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import ApperIcon from "@/components/ApperIcon"
import { taskService } from "@/services/api/taskService"
import { filterTasks, sortTasks } from "@/utils/taskHelpers"

const TaskDashboard = () => {
const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filters, setFilters] = useState({
    searchTerm: "",
    categories: [],
    priorities: [],
    showCompleted: true,
    dateRange: "all"
  })
  
  const [sortBy, setSortBy] = useState("created")
  const [showAddForm, setShowAddForm] = useState(false)

  useEffect(() => {
    loadTasks()
  }, [])

const loadTasks = async () => {
    try {
      setError(null)
      setLoading(true)
      const data = await taskService.getAll()
      setTasks(data)
    } catch (err) {
      console.error("Failed to load tasks:", err)
      setError("Failed to load tasks. Please try again.")
    } finally {
      setLoading(false)
    }
  }

const handleAddTask = (newTask) => {
    setTasks(prev => [newTask, ...prev])
    setShowAddForm(false)
  }

  const handleUpdateTask = (updatedTask) => {
    setTasks(prev => prev.map(task => 
      task.Id === updatedTask.Id ? updatedTask : task
    ))
  }

  const handleDeleteTask = async (taskId) => {
    await taskService.delete(taskId)
    setTasks(prev => prev.filter(task => task.Id !== taskId))
  }

  const handleToggleComplete = async (taskId, completed) => {
    const updatedTask = await taskService.update(taskId, { completed })
    setTasks(prev => prev.map(task => 
      task.Id === taskId ? updatedTask : task
    ))
  }

  const handleSearchChange = (searchTerm) => {
    setFilters(prev => ({
      ...prev,
      searchTerm
    }))
  }

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters)
  }

  // Apply filters and sorting
const filteredTasks = filterTasks(tasks, filters)
  const sortedTasks = sortTasks(filteredTasks, sortBy)
  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Error message={error} onRetry={loadTasks} />
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      {/* Header with Progress */}
<TaskHeader tasks={tasks} />

      {/* Controls Section */}
      <div className="space-y-6">
        {/* Search and Add Task */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="flex-1 w-full sm:w-auto">
            <SearchBar 
              onSearch={handleSearchChange}
              placeholder="Search tasks by title or category..."
            />
          </div>
          
          <Button
            variant="accent"
            onClick={() => setShowAddForm(true)}
            className="w-full sm:w-auto whitespace-nowrap"
          >
            <ApperIcon name="Plus" size={18} className="mr-2" />
            Add Task
          </Button>
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-col lg:flex-row gap-4 justify-between">
          <div className="flex-1">
            <FilterControls
              filters={filters}
              onFiltersChange={handleFiltersChange}
              taskCount={sortedTasks.length}
            />
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 whitespace-nowrap">Sort by:</span>
<select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="select min-w-0 sm:min-w-[140px]"
            >
              <option value="created">Recently added</option>
              <option value="dueDate">Due date</option>
              <option value="priority">Priority</option>
              <option value="alphabetical">A-Z</option>
            </select>
          </div>
        </div>
      </div>

      {/* Add Task Form */}
      {showAddForm && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
        >
          <TaskForm
            onSave={handleAddTask}
            onCancel={() => setShowAddForm(false)}
          />
        </motion.div>
      )}

      {/* Task List */}
<TaskList
        tasks={sortedTasks}
        onUpdateTask={handleUpdateTask}
        onDeleteTask={handleDeleteTask}
        onToggleComplete={handleToggleComplete}
        onAddTask={() => setShowAddForm(true)}
      />
    </motion.div>
  )
}

export default TaskDashboard