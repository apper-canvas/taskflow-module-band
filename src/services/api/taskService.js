import { toast } from 'react-toastify'

class TaskService {
  constructor() {
    // Initialize ApperClient
    const { ApperClient } = window.ApperSDK
    this.apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    })
    this.tableName = 'task_c'
  }

  async getAll() {
    try {
      const params = {
fields: [
          { field: { Name: "Name" } },
          { field: { Name: "title_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "completed_c" } },
          { field: { Name: "priority_c" } },
          { field: { Name: "status_c" } },
          { field: { Name: "due_date_c" } },
          { field: { Name: "created_at_c" } },
          { field: { Name: "completed_at_c" } },
          { 
            field: { name: "category_c" },
            referenceField: { field: { Name: "Name" } }
          }
        ],
        orderBy: [
          { fieldName: "created_at_c", sorttype: "DESC" }
        ]
      }

      const response = await this.apperClient.fetchRecords(this.tableName, params)
      
      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return []
      }

      if (!response.data || response.data.length === 0) {
        return []
      }

      // Transform API response to match UI expectations
return response.data.map(task => ({
Id: task.Id,
        title: task.title_c,
        description: task.description_c,
        completed: task.completed_c,
        priority: task.priority_c,
        status: task.status_c,
        category: task.category_c?.Name,
        dueDate: task.due_date_c,
        createdAt: task.created_at_c,
        completedAt: task.completed_at_c
      }))
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching tasks:", error?.response?.data?.message)
      } else {
        console.error(error.message)
      }
      return []
    }
  }

  async getById(id) {
    try {
      const params = {
fields: [
          { field: { Name: "Name" } },
          { field: { Name: "title_c" } },
          { field: { Name: "description_c" } },
          { field: { Name: "completed_c" } },
          { field: { Name: "priority_c" } },
          { field: { Name: "status_c" } },
          { field: { Name: "due_date_c" } },
          { field: { Name: "created_at_c" } },
          { field: { Name: "completed_at_c" } },
          { 
            field: { name: "category_c" },
            referenceField: { field: { Name: "Name" } }
          }
        ]
      }

      const response = await this.apperClient.getRecordById(this.tableName, id, params)

      if (!response || !response.data) {
        return null
      }

      const task = response.data
return {
        Id: task.Id,
title: task.title_c,
        description: task.description_c,
        completed: task.completed_c,
        priority: task.priority_c,
        status: task.status_c,
        category: task.category_c?.Name,
        dueDate: task.due_date_c,
        createdAt: task.created_at_c,
        completedAt: task.completed_at_c
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching task with ID ${id}:`, error?.response?.data?.message)
      } else {
        console.error(error.message)
      }
      return null
    }
  }

  async create(taskData) {
    try {
      const params = {
        records: [{
Name: taskData.title || "New Task",
          title_c: taskData.title,
          description_c: taskData.description || null,
          completed_c: false,
          priority_c: taskData.priority,
          status_c: taskData.status || "active",
          due_date_c: taskData.dueDate || null,
          created_at_c: new Date().toISOString(),
          completed_at_c: null,
          category_c: taskData.category ? taskData.category : null
        }]
      }

      const response = await this.apperClient.createRecord(this.tableName, params)

      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return null
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success)
        const failedRecords = response.results.filter(result => !result.success)

        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} task records:${JSON.stringify(failedRecords)}`)
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`)
            })
            if (record.message) toast.error(record.message)
          })
        }

        if (successfulRecords.length > 0) {
          const task = successfulRecords[0].data
          return {
            Id: task.Id,
title: task.title_c,
            description: task.description_c,
            completed: task.completed_c,
            priority: task.priority_c,
            status: task.status_c,
            category: task.category_c?.Name,
            dueDate: task.due_date_c,
            createdAt: task.created_at_c,
            completedAt: task.completed_at_c
          }
        }
      }

      return null
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating task:", error?.response?.data?.message)
      } else {
        console.error(error.message)
      }
      return null
    }
  }

  async update(id, updates) {
    try {
      const updateData = {
        Id: parseInt(id)
      }

      // Map UI field names to database field names
if (updates.title !== undefined) updateData.title_c = updates.title
      if (updates.description !== undefined) updateData.description_c = updates.description
      if (updates.completed !== undefined) {
        updateData.completed_c = updates.completed
        updateData.completed_at_c = updates.completed ? new Date().toISOString() : null
      }
      if (updates.priority !== undefined) updateData.priority_c = updates.priority
      if (updates.status !== undefined) updateData.status_c = updates.status
      if (updates.dueDate !== undefined) updateData.due_date_c = updates.dueDate
      if (updates.category !== undefined) updateData.category_c = updates.category
      const params = {
        records: [updateData]
      }

      const response = await this.apperClient.updateRecord(this.tableName, params)

      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return null
      }

      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success)
        const failedUpdates = response.results.filter(result => !result.success)

        if (failedUpdates.length > 0) {
          console.error(`Failed to update ${failedUpdates.length} task records:${JSON.stringify(failedUpdates)}`)
          
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`)
            })
            if (record.message) toast.error(record.message)
          })
        }

        if (successfulUpdates.length > 0) {
          const task = successfulUpdates[0].data
          return {
Id: task.Id,
title: task.title_c,
            description: task.description_c,
            completed: task.completed_c,
            priority: task.priority_c,
            status: task.status_c,
            category: task.category_c?.Name,
            dueDate: task.due_date_c,
            createdAt: task.created_at_c,
            completedAt: task.completed_at_c
          }
        }
      }

      return null
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating task:", error?.response?.data?.message)
      } else {
        console.error(error.message)
      }
      return null
    }
  }

  async delete(id) {
    try {
      const params = {
        RecordIds: [parseInt(id)]
      }

      const response = await this.apperClient.deleteRecord(this.tableName, params)

      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return false
      }

      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success)
        const failedDeletions = response.results.filter(result => !result.success)

        if (failedDeletions.length > 0) {
          console.error(`Failed to delete ${failedDeletions.length} task records:${JSON.stringify(failedDeletions)}`)
          
          failedDeletions.forEach(record => {
            if (record.message) toast.error(record.message)
          })
        }

        return successfulDeletions.length > 0
      }

      return false
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting task:", error?.response?.data?.message)
      } else {
        console.error(error.message)
      }
      return false
    }
  }

  async bulkUpdate(ids, updates) {
    try {
      const records = ids.map(id => {
        const updateData = { Id: parseInt(id) }
        
if (updates.title !== undefined) updateData.title_c = updates.title
        if (updates.description !== undefined) updateData.description_c = updates.description
        if (updates.completed !== undefined) {
          updateData.completed_c = updates.completed
          updateData.completed_at_c = updates.completed ? new Date().toISOString() : null
        }
        if (updates.priority !== undefined) updateData.priority_c = updates.priority
        if (updates.status !== undefined) updateData.status_c = updates.status
        if (updates.dueDate !== undefined) updateData.due_date_c = updates.dueDate
        if (updates.category !== undefined) updateData.category_c = updates.category
        return updateData
      })

      const params = { records }

      const response = await this.apperClient.updateRecord(this.tableName, params)

      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return []
      }

      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success)
        const failedUpdates = response.results.filter(result => !result.success)

        if (failedUpdates.length > 0) {
          console.error(`Failed to update ${failedUpdates.length} task records:${JSON.stringify(failedUpdates)}`)
        }

        return successfulUpdates.map(result => {
          const task = result.data
          return {
Id: task.Id,
title: task.title_c,
            description: task.description_c,
            completed: task.completed_c,
            priority: task.priority_c,
            status: task.status_c,
            category: task.category_c?.Name,
            dueDate: task.due_date_c,
            createdAt: task.created_at_c,
            completedAt: task.completed_at_c
          }
        })
      }

      return []
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error bulk updating tasks:", error?.response?.data?.message)
      } else {
        console.error(error.message)
      }
      return []
    }
  }

  async bulkDelete(ids) {
    try {
      const params = {
        RecordIds: ids.map(id => parseInt(id))
      }

      const response = await this.apperClient.deleteRecord(this.tableName, params)

      if (!response.success) {
        console.error(response.message)
        toast.error(response.message)
        return 0
      }

      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success)
        const failedDeletions = response.results.filter(result => !result.success)

        if (failedDeletions.length > 0) {
          console.error(`Failed to delete ${failedDeletions.length} task records:${JSON.stringify(failedDeletions)}`)
        }

        return successfulDeletions.length
      }

      return 0
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error bulk deleting tasks:", error?.response?.data?.message)
      } else {
        console.error(error.message)
      }
      return 0
    }
  }
}

export const taskService = new TaskService()