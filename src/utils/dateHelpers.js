import { format, isToday, isTomorrow, isPast, isThisWeek, parseISO } from "date-fns"

export const formatDueDate = (dateString) => {
  if (!dateString) return null
  
  const date = typeof dateString === "string" ? parseISO(dateString) : dateString
  
  if (isToday(date)) {
    return "Today"
  } else if (isTomorrow(date)) {
    return "Tomorrow"
  } else if (isThisWeek(date)) {
    return format(date, "EEEE")
  } else {
    return format(date, "MMM d")
  }
}

export const isOverdue = (dateString) => {
  if (!dateString) return false
  const date = typeof dateString === "string" ? parseISO(dateString) : dateString
  return isPast(date) && !isToday(date)
}

export const getDueDateColor = (dateString) => {
  if (!dateString) return "text-gray-500"
  
  if (isOverdue(dateString)) {
    return "text-red-600"
  } else if (isToday(dateString)) {
    return "text-orange-600"
  } else if (isTomorrow(dateString)) {
    return "text-blue-600"
  } else {
    return "text-gray-600"
  }
}

export const formatDateForInput = (date) => {
  if (!date) return ""
  const dateObj = typeof date === "string" ? parseISO(date) : date
  return format(dateObj, "yyyy-MM-dd")
}