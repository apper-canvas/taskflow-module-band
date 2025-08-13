import { useState, useEffect } from "react"
import Select from "@/components/atoms/Select"
import { categoryService } from "@/services/api/categoryService"

const CategorySelector = ({ value, onChange, className = "" }) => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = async () => {
    try {
      const data = await categoryService.getAll()
      setCategories(data)
    } catch (error) {
      console.error("Failed to load categories:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Select className={className} disabled>
        <option>Loading categories...</option>
      </Select>
    )
  }

  return (
    <Select
      value={value || ""}
      onChange={(e) => onChange(e.target.value || null)}
      className={className}
    >
      <option value="">No category</option>
      {categories.map((category) => (
        <option key={category.Id} value={category.name}>
          {category.name}
        </option>
      ))}
    </Select>
  )
}

export default CategorySelector