import Link from 'next/link'
import React from 'react'
// import LoadingSpinner from '../LoadingSpinner'

interface CategoryProps {
    categories: { name: string, slug: string, subcategories: { name: string, slug: string }[] }[]
}
const HeaderCategoryList = ({ categories }: CategoryProps) => {

    return (
        <>
            <li className="nav-item bb-main-dropdown flex items-center mr-[45px]">
                <a
                    className="nav-link bb-dropdown-item font-Poppins relative p-[0] leading-[28px] text-[15px] font-medium text-[#3d4750] block tracking-[0.03rem]"
                >
                    Categories
                </a>
                <ul className="mega-menu min-w-full transition-all duration-[0.3s] ease-in-out mt-[25px] pl-[30px] absolute top-[40px] z-[16] text-left opacity-[0] invisible left-[0] right-[auto] bg-[#fff] border-[1px] border-solid border-[#eee] flex flex-col rounded-[10px]">
                    <li className="m-[0] flex ">
                        {
                            categories.length > 0 ?


                                categories.map((category, index) => {
                                    return (
                                        category.subcategories.length > 0 &&
                                        <ul key={index} className="mega-block w-[calc(25%-30px)] mr-[30px] py-[15px]">
                                            <li className="menu_title border-b-[1px] border-solid border-[#eee] mb-[10px] pb-[5px] flex items-center leading-[28px]">
                                                <Link
                                                    href={`/category/${category.slug}`}
                                                    className="transition-all duration-[0.3s] ease-in-out font-Poppins h-[auto] text-[#6c7fd8] text-[15px] font-medium tracking-[0.03rem] block py-[10px] leading-[22px] capitalize"
                                                >
                                                    {category.name}
                                                </Link>
                                            </li>
                                            {category.subcategories.map((subCategory, subIndex) => {
                                                return (
                                                    <li key={subIndex} className="flex items-center leading-[28px]">
                                                        <Link
                                                            href={`/category/${category.slug}/${subCategory.slug}`}
                                                            className="transition-all duration-[0.3s] ease-in-out font-Poppins py-[10px] leading-[22px] text-[14px] font-normal tracking-[0.03rem] text-[#686e7d] hover:text-[#6c7fd8] capitalize"
                                                        >
                                                            {subCategory.name}
                                                        </Link>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    )
                                })
                                : (

                                    <div className="w-full h-52 flex items-center justify-center ">
                                        <p className="text-lg font-medium text-gray-600 animate-pulse">⏳ Please wait...</p>
                                    </div>

                                )
                        }
                    </li>
                </ul>
            </li>
        </>
    )
}

export default HeaderCategoryList