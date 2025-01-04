import React from 'react'
import Select, { StylesConfig } from 'react-select'

interface ProductHeaderProps {
    viewMode: "grid" | "list"
    onViewModeChange: (mode: "grid" | "list") => void
    totalProducts: number
}




interface Option {
    value: string;
    label: string;
}

const options: Option[] = [
    { value: 'featured', label: 'Featured' },
    { value: 'newest', label: 'Newest' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' }
];

const customStyles: StylesConfig<Option, false> = {
    control: (base) => ({
        ...base,
        backgroundColor: '#f9fafb',
        border: '1px solid #d1d5db',
        borderRadius: '8px',
        padding: '4px',
        boxShadow: 'none',
        '&:hover': {
            borderColor: '#9ca3af',
        },
    }),
    option: (base, { isFocused, isSelected }) => ({
        ...base,
        backgroundColor: isSelected
            ? '#4f46e5'
            : isFocused
                ? '#e0e7ff'
                : 'white',
        color: isSelected ? 'white' : '#374151',
        padding: '10px',
        cursor: 'pointer',
    }),
    menu: (base) => ({
        ...base,
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
    }),
    placeholder: (base) => ({
        ...base,
        color: '#9ca3af',
        fontSize: '14px',
    }),
    singleValue: (base) => ({
        ...base,
        color: '#374151',
        fontSize: '14px',
    }),
};

export function ProductHeader({ viewMode, onViewModeChange }: ProductHeaderProps) {
    return (
        <>
            <div className="w-full px-[12px]">
                <div className="bb-pro-list-top mb-[24px] rounded-[20px] flex bg-[#f8f8fb] border-[1px] border-solid border-[#eee] justify-between">
                    <div className="flex flex-wrap w-full">
                        <div className="w-[50%] px-[12px] max-[420px]:w-full ">
                            <div className="bb-bl-btn py-[10px] flex max-[420px]:justify-center">
                                <button
                                    type="button"
                                    className={`grid-btn btn-grid-100 h-[38px] w-[38px] flex justify-center items-center border-[0] p-[5px] bg-transparent mr-[5px] ${viewMode === "grid" ? "active" : ""} }`}
                                    title="grid"
                                    onClick={() => onViewModeChange("grid")}
                                >
                                    <i className="ri-apps-line text-[20px]" />
                                </button>
                                <button
                                    type="button"
                                    className={`grid-btn btn-list-100 h-[38px] w-[38px] flex justify-center items-center border-[0] p-[5px] bg-transparent ${viewMode === "list" ? "active" : ""} }`}
                                    title="grid"
                                    onClick={() => onViewModeChange("list")}
                                >
                                    <i className="ri-list-unordered text-[20px]" />
                                </button>
                            </div>
                        </div>
                        {/* <div>
                            <p className="text-sm text-gray-500">
                                Showing {totalProducts} products
                            </p>
                        </div> */}
                        <div className="w-[50%] px-[12px] max-[420px]:w-full">
                            <div className="bb-select-inner h-full py-[10px] flex items-center justify-end max-[420px]:justify-center">
                                <div className="mr-[30px] flex justify-end text-[#777]  items-center text-[14px] relative max-[420px]:justify-left">
                                    <Select
                                        options={options}
                                        styles={customStyles}
                                        placeholder="Choose an option"
                                    // onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
