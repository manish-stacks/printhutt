'use client'

interface TagFilterProps {
  tags: string[]
  selectedTags: string[]
  onChange: (tags: string[]) => void
}

export function TagFilter({ tags, selectedTags, onChange }: TagFilterProps) {
  return (
    <div className="bb-sidebar-block p-[20px]">
      <h3 className="font-quicksand text-[18px] tracking-[0.03rem] leading-[1.2] font-bold text-[#3d4750] mb-4">
        Tags
      </h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => {
              const newTags = selectedTags.includes(tag)
                ? selectedTags.filter(t => t !== tag)
                : [...selectedTags, tag]
              onChange(newTags)
            }}
            className={`
              py-1 px-3 text-sm rounded-full transition-colors
              ${selectedTags.includes(tag)
                ? 'bg-[#6c7fd8] text-white'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }
            `}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  )
}