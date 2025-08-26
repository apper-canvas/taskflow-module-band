export const getPriorityColor = (priority) => {
  switch (priority?.toLowerCase()) {
    case "high":
      return "bg-red-100 text-red-800 border-red-200"
    case "medium":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "low":
      return "bg-green-100 text-green-800 border-green-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

export const getTaskColor = (color) => {
  const colors = {
    blue: "bg-blue-100 text-blue-800 border-blue-200",
    green: "bg-green-100 text-green-800 border-green-200", 
    purple: "bg-purple-100 text-purple-800 border-purple-200",
    pink: "bg-pink-100 text-pink-800 border-pink-200",
    indigo: "bg-indigo-100 text-indigo-800 border-indigo-200",
    orange: "bg-orange-100 text-orange-800 border-orange-200",
    teal: "bg-teal-100 text-teal-800 border-teal-200",
    cyan: "bg-cyan-100 text-cyan-800 border-cyan-200"
  }
  
  return colors[color] || "bg-gray-100 text-gray-800 border-gray-200"
}

export const getCategoryColor = (categoryName) => {
  const colors = [
    "bg-blue-100 text-blue-800",
    "bg-green-100 text-green-800",
    "bg-purple-100 text-purple-800",
    "bg-pink-100 text-pink-800",
    "bg-indigo-100 text-indigo-800",
    "bg-orange-100 text-orange-800",
    "bg-teal-100 text-teal-800",
    "bg-cyan-100 text-cyan-800"
  ]
  
  const hash = categoryName.split("").reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0)
    return a & a
  }, 0)
  
  return colors[Math.abs(hash) % colors.length]
}

export const sortTasks = (tasks, sortBy) => {
  const sortedTasks = [...tasks]
  
  switch (sortBy) {
    case "priority":
      const priorityOrder = { high: 3, medium: 2, low: 1 }
      return sortedTasks.sort((a, b) => {
        const aPriority = priorityOrder[a.priority?.toLowerCase()] || 0
        const bPriority = priorityOrder[b.priority?.toLowerCase()] || 0
        return bPriority - aPriority
      })
    case "dueDate":
      return sortedTasks.sort((a, b) => {
        if (!a.dueDate && !b.dueDate) return 0
        if (!a.dueDate) return 1
        if (!b.dueDate) return -1
        return new Date(a.dueDate) - new Date(b.dueDate)
      })
    case "created":
      return sortedTasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    case "alphabetical":
      return sortedTasks.sort((a, b) => a.title.localeCompare(b.title))
    default:
      return sortedTasks
  }
}

export const filterTasks = (tasks, filters) => {
  return tasks.filter(task => {
    // Search term filter
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase()
      if (!task.title.toLowerCase().includes(searchLower) &&
          !task.category?.toLowerCase().includes(searchLower)) {
        return false
      }
    }
    
    // Category filter
    if (filters.categories.length > 0 && !filters.categories.includes(task.category)) {
      return false
    }
    
    // Priority filter
    if (filters.priorities.length > 0 && !filters.priorities.includes(task.priority)) {
      return false
    }
    
    // Status filter
    if (filters.status.length > 0 && !filters.status.includes(task.status)) {
      return false
    }
    
    // Completed filter
    if (!filters.showCompleted && task.completed) {
      return false
    }
    
    // Date range filter
    if (filters.dateRange && filters.dateRange !== "all") {
      const today = new Date()
      const taskDate = task.dueDate ? new Date(task.dueDate) : null
      
      switch (filters.dateRange) {
        case "today":
          if (!taskDate || taskDate.toDateString() !== today.toDateString()) {
            return false
          }
          break
        case "week":
          if (!taskDate) return false
          const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
          if (taskDate < today || taskDate > weekFromNow) {
            return false
          }
          break
        case "overdue":
          if (!taskDate || taskDate >= today || task.completed) {
            return false
          }
          break
      }
    }
    
    return true
  })
}

export const calculateProgress = (tasks) => {
  if (tasks.length === 0) return 0
  const completedTasks = tasks.filter(task => task.completed).length
  return Math.round((completedTasks / tasks.length) * 100)
}