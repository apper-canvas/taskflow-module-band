import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Button from "@/components/atoms/Button"
import Select from "@/components/atoms/Select"
import ApperIcon from "@/components/ApperIcon"
import { categoryService } from "@/services/api/categoryService"

const FilterControls = ({ filters, onFiltersChange, taskCount = 0 }) => {
  const [categories, setCategories] = useState([])
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    loadCategories()
  }, [])

const loadCategories = async () => {
    try {
      const data = await categoryService.getAll()
      setCategories(data)
    } catch (error) {
      console.error("Failed to load categories:", error)
    }
  }
  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    })
  }

  const togglePriority = (priority) => {
    const newPriorities = filters.priorities.includes(priority)
      ? filters.priorities.filter(p => p !== priority)
      : [...filters.priorities, priority]
    
    handleFilterChange("priorities", newPriorities)
  }

const toggleCategory = (category) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category]
    
    handleFilterChange("categories", newCategories)
  }

const clearAllFilters = () => {
    onFiltersChange({
      searchTerm: "",
      categories: [],
      priorities: [],
      status: [],
      showCompleted: true,
      dateRange: "all"
    })
  }

const hasActiveFilters = filters.searchTerm || 
    filters.categories.length > 0 || 
    filters.priorities.length > 0 || 
    filters.status.length > 0 || 
    !filters.showCompleted || 
    filters.dateRange !== "all"

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <ApperIcon name="Filter" size={16} />
            Filters
            {hasActiveFilters && (
              <span className="w-2 h-2 bg-accent rounded-full"></span>
            )}
          </Button>
          
          <span className="text-sm text-gray-600">
            {taskCount} {taskCount === 1 ? "task" : "tasks"}
          </span>
        </div>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            Clear filters
          </Button>
        )}
      </div>

      <motion.div
        initial={false}
        animate={{ height: showFilters ? "auto" : 0, opacity: showFilters ? 1 : 0 }}
        className="overflow-hidden"
      >
        <div className="card p-4 space-y-4">
          {/* Date Range Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Due Date
            </label>
            <Select
              value={filters.dateRange}
              onChange={(e) => handleFilterChange("dateRange", e.target.value)}
              className="w-full"
            >
              <option value="all">All tasks</option>
              <option value="today">Due today</option>
              <option value="week">Due this week</option>
              <option value="overdue">Overdue</option>
            </Select>
          </div>

          {/* Priority Filters */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Priority
            </label>
            <div className="flex gap-2">
              {["high", "medium", "low"].map((priority) => (
                <Button
                  key={priority}
                  variant={filters.priorities.includes(priority) ? "primary" : "ghost"}
                  size="sm"
                  onClick={() => togglePriority(priority)}
                  className={`capitalize ${
                    !filters.priorities.includes(priority) 
                      ? priority === "high" 
                        ? "text-red-600 hover:bg-red-50" 
                        : priority === "medium"
                        ? "text-yellow-600 hover:bg-yellow-50"
                        : "text-green-600 hover:bg-green-50"
                      : ""
                  }`}
                >
                  {priority}
                </Button>
              ))}
            </div>
          </div>

{/* Category Filters */}
{categories.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categories
              </label>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category.Id}
                    variant={filters.categories.includes(category.name) ? "primary" : "ghost"}
                    size="sm"
                    onClick={() => toggleCategory(category.name)}
                    className="text-sm"
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Status Filters */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <div className="flex gap-2">
              {["active", "archived"].map((status) => (
                <Button
                  key={status}
                  variant={filters.status.includes(status) ? "primary" : "ghost"}
                  size="sm"
                  onClick={() => {
                    const newStatus = filters.status.includes(status)
                      ? filters.status.filter(s => s !== status)
                      : [...filters.status, status]
                    onFiltersChange({ ...filters, status: newStatus })
                  }}
                  className={`capitalize ${
                    !filters.status.includes(status) 
                      ? status === "active" 
                        ? "text-green-600 hover:bg-green-50" 
                        : "text-gray-600 hover:bg-gray-50"
                      : ""
                  }`}
                >
                  {status}
                </Button>
              ))}
            </div>
          </div>
          {/* Show Completed Toggle */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Show completed tasks</span>
            <Button
              variant={filters.showCompleted ? "primary" : "ghost"}
              size="sm"
              onClick={() => handleFilterChange("showCompleted", !filters.showCompleted)}
            >
              <ApperIcon 
                name={filters.showCompleted ? "Eye" : "EyeOff"} 
                size={16} 
              />
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default FilterControls