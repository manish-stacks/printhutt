'use client'

interface PriceFilterProps {
  range: { min: number; max: number }
  value: [number, number]
  onChange: (range: [number, number]) => void
}

export function PriceFilter({ range, value, onChange }: PriceFilterProps) {
  return (
    <div className="bb-sidebar-block p-[20px] border-b-[1px] border-solid border-[#eee]">
      <h3 className="font-quicksand text-[18px] tracking-[0.03rem] leading-[1.2] font-bold text-[#3d4750] mb-4">
        Price Range
      </h3>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <input
            type="number"
            min={range.min}
            max={value[1]}
            value={value[0]}
            onChange={(e) => onChange([Number(e.target.value), value[1]])}
            className="w-24 px-2 py-1 border rounded"
          />
          <span>to</span>
          <input
            type="number"
            min={value[0]}
            max={range.max}
            value={value[1]}
            onChange={(e) => onChange([value[0], Number(e.target.value)])}
            className="w-24 px-2 py-1 border rounded"
          />
        </div>
        <input
          type="range"
          min={range.min}
          max={range.max}
          value={value[1]}
          onChange={(e) => onChange([value[0], Number(e.target.value)])}
          className="w-full"
        />
      </div>
    </div>
  )
}