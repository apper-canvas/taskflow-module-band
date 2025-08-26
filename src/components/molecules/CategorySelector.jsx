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

export const ColorSelector = ({ value, onChange, className = "" }) => {
  const colors = [
    { name: 'blue', class: 'bg-blue-500' },
    { name: 'green', class: 'bg-green-500' },
    { name: 'purple', class: 'bg-purple-500' },
    { name: 'pink', class: 'bg-pink-500' },
    { name: 'indigo', class: 'bg-indigo-500' },
    { name: 'orange', class: 'bg-orange-500' },
    { name: 'teal', class: 'bg-teal-500' },
    { name: 'cyan', class: 'bg-cyan-500' }
  ]

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      <button
        type="button"
        onClick={() => onChange(null)}
        className={`w-6 h-6 rounded-full border-2 transition-all duration-200 ${
          !value ? 'border-gray-400 bg-gray-100' : 'border-gray-200 bg-white'
        } hover:border-gray-400`}
        title="No color"
      />
      {colors.map((color) => (
        <button
          key={color.name}
          type="button"
          onClick={() => onChange(color.name)}
          className={`w-6 h-6 rounded-full border-2 transition-all duration-200 ${color.class} ${
            value === color.name ? 'border-gray-800 ring-2 ring-gray-200' : 'border-gray-200'
          } hover:border-gray-400`}
          title={color.name}
        />
      ))}
    </div>
  )
}