import { FormField } from "../../../CommonComponent/FormField";
import {type PositionListResult} from "../types/hrTemplate.types"

export const PositionField = ({ formData, handleChange, errors, setShowDropdown, showDropdown, positionList, handleSelectPosition }: any) => {

  return(
  <div className="relative space-y-2">
    <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">
      2. Select Position Name
    </label>
    <FormField
      label=""
      name="positionName"
      value={formData.positionName}
      onChange={handleChange}
      error={errors}
      onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
    />
    {showDropdown && positionList.length > 0 && (
      <ul className="absolute z-10 w-full bg-white border border-slate-200 rounded-md shadow-lg max-h-40 overflow-y-auto mt-1">
        {positionList.map((pos: PositionListResult) => (
          <li
            key={pos.id}
            onClick={() => handleSelectPosition(pos.position_name)}
            className="px-4 py-2 hover:bg-blue-50 cursor-pointer text-sm text-slate-700 border-b border-slate-50 last:border-none"
          >
            {pos.position_name}
          </li>
        ))}
      </ul>
    )}
  </div>
)};