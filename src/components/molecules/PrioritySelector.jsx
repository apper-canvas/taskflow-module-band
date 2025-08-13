import Select from "@/components/atoms/Select"

const PrioritySelector = ({ value, onChange, className = "" }) => {
  return (
    <Select
      value={value || ""}
      onChange={(e) => onChange(e.target.value || null)}
      className={className}
    >
      <option value="">No priority</option>
      <option value="high">High Priority</option>
      <option value="medium">Medium Priority</option>
      <option value="low">Low Priority</option>
    </Select>
  )
}

export default PrioritySelector