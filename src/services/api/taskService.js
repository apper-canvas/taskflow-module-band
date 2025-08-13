import mockTasks from "@/services/mockData/tasks.json"

class TaskService {
  constructor() {
    this.tasks = [...mockTasks]
  }

  async delay() {
    return new Promise(resolve => setTimeout(resolve, 300))
  }

  async getAll() {
    await this.delay()
    return [...this.tasks].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  }

  async getById(id) {
    await this.delay()
    const task = this.tasks.find(task => task.Id === parseInt(id))
    if (!task) {
      throw new Error(`Task with id ${id} not found`)
    }
    return { ...task }
  }

  async create(taskData) {
    await this.delay()
    
    const newTask = {
      Id: Math.max(...this.tasks.map(t => t.Id), 0) + 1,
      ...taskData,
      completed: false,
      createdAt: new Date().toISOString(),
      completedAt: null
    }
    
    this.tasks.unshift(newTask)
    return { ...newTask }
  }

  async update(id, updates) {
    await this.delay()
    
    const taskIndex = this.tasks.findIndex(task => task.Id === parseInt(id))
    if (taskIndex === -1) {
      throw new Error(`Task with id ${id} not found`)
    }
    
    const currentTask = this.tasks[taskIndex]
    const updatedTask = {
      ...currentTask,
      ...updates,
      completedAt: updates.completed && !currentTask.completed 
        ? new Date().toISOString()
        : updates.completed === false 
        ? null 
        : currentTask.completedAt
    }
    
    this.tasks[taskIndex] = updatedTask
    return { ...updatedTask }
  }

  async delete(id) {
    await this.delay()
    
    const taskIndex = this.tasks.findIndex(task => task.Id === parseInt(id))
    if (taskIndex === -1) {
      throw new Error(`Task with id ${id} not found`)
    }
    
    this.tasks.splice(taskIndex, 1)
    return true
  }

  async bulkUpdate(ids, updates) {
    await this.delay()
    
    const updatedTasks = []
    
    for (const id of ids) {
      const taskIndex = this.tasks.findIndex(task => task.Id === parseInt(id))
      if (taskIndex !== -1) {
        const currentTask = this.tasks[taskIndex]
        const updatedTask = {
          ...currentTask,
          ...updates,
          completedAt: updates.completed && !currentTask.completed 
            ? new Date().toISOString()
            : updates.completed === false 
            ? null 
            : currentTask.completedAt
        }
        
        this.tasks[taskIndex] = updatedTask
        updatedTasks.push({ ...updatedTask })
      }
    }
    
    return updatedTasks
  }

  async bulkDelete(ids) {
    await this.delay()
    
    const deletedCount = this.tasks.length
    this.tasks = this.tasks.filter(task => !ids.includes(task.Id))
    
    return deletedCount - this.tasks.length
  }
}

export const taskService = new TaskService()