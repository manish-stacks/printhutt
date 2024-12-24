'use client'

interface CategoryFilterProps {
  categories: string[]
  selectedCategories: string[]
  onChange: (categories: string[]) => void
}

export function CategoryFilter({ categories, selectedCategories, onChange }: CategoryFilterProps) {
  return (
    <div className="bb-sidebar-block p-[20px] border-b-[1px] border-solid border-[#eee]">
      <h3 className="font-quicksand text-[18px] tracking-[0.03rem] leading-[1.2] font-bold text-[#3d4750] mb-4">
        Category
      </h3>
      <div className="bb-sidebar-contact">
        <ul>
          {categories.map(category => (
            <li key={category} className="relative block mb-[14px]">
              <div className="bb-sidebar-block-item relative">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={(e) => {
                    const newCategories = e.target.checked
                      ? [...selectedCategories, category]
                      : selectedCategories.filter(c => c !== category)
                    onChange(newCategories)
                  }}
                  className="w-full h-[calc(100%-5px)] absolute opacity-[0] cursor-pointer z-[999] top-[50%] left-[0] translate-y-[-50%]"
                />
                <span className="ml-[30px] block text-[#777] text-[14px] leading-[20px] font-normal capitalize cursor-pointer">
                  {category}
                </span>
                <span className="checked absolute top-[0] left-[0] h-[18px] w-[18px] bg-[#fff] border-[1px] border-solid border-[#eee] rounded-[5px] overflow-hidden" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}