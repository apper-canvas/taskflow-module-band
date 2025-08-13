import mockCategories from "@/services/mockData/categories.json"

class CategoryService {
  constructor() {
    this.categories = [...mockCategories]
  }

  async delay() {
    return new Promise(resolve => setTimeout(resolve, 200))
  }

  async getAll() {
    await this.delay()
    return [...this.categories].sort((a, b) => a.name.localeCompare(b.name))
  }

  async getById(id) {
    await this.delay()
    const category = this.categories.find(cat => cat.Id === parseInt(id))
    if (!category) {
      throw new Error(`Category with id ${id} not found`)
    }
    return { ...category }
  }

  async create(categoryData) {
    await this.delay()
    
    const newCategory = {
      Id: Math.max(...this.categories.map(c => c.Id), 0) + 1,
      ...categoryData,
      taskCount: 0
    }
    
    this.categories.push(newCategory)
    return { ...newCategory }
  }

  async update(id, updates) {
    await this.delay()
    
    const categoryIndex = this.categories.findIndex(cat => cat.Id === parseInt(id))
    if (categoryIndex === -1) {
      throw new Error(`Category with id ${id} not found`)
    }
    
    const updatedCategory = {
      ...this.categories[categoryIndex],
      ...updates
    }
    
    this.categories[categoryIndex] = updatedCategory
    return { ...updatedCategory }
  }

  async delete(id) {
    await this.delay()
    
    const categoryIndex = this.categories.findIndex(cat => cat.Id === parseInt(id))
    if (categoryIndex === -1) {
      throw new Error(`Category with id ${id} not found`)
    }
    
    this.categories.splice(categoryIndex, 1)
    return true
  }
}

export const categoryService = new CategoryService()