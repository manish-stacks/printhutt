'use client'

interface RatingFilterProps {
  selectedRating: number | null
  onChange: (rating: number | null) => void
}

export function RatingFilter({ selectedRating, onChange }: RatingFilterProps) {
  return (
    <div className="bb-sidebar-block p-[20px] border-b-[1px] border-solid border-[#eee]">
      <h3 className="font-quicksand text-[18px] tracking-[0.03rem] leading-[1.2] font-bold text-[#3d4750] mb-4">
        Rating
      </h3>
      <div className="space-y-2">
        {[5, 4, 3, 2, 1].map((rating) => (
          <label key={rating} className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              checked={selectedRating === rating}
              onChange={() => onChange(rating === selectedRating ? null : rating)}
              className="hidden"
            />
            <span className="flex items-center">
              {Array.from({ length: 5 }).map((_, index) => (
                <i
                  key={index}
                  className={`ri-star-${index < rating ? 'fill' : 'line'} text-[15px] ${
                    index < rating ? 'text-[#fea99a]' : 'text-[#777]'
                  }`}
                />
              ))}
            </span>
            <span className="text-sm text-gray-600">& Up</span>
          </label>
        ))}
      </div>
    </div>
  )
}