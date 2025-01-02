import React from 'react'

const HeaderCategoryList = () => {


    
    return (
        <>
            <li className="nav-item bb-main-dropdown flex items-center mr-[45px]">
                <a
                    className="nav-link bb-dropdown-item font-Poppins relative p-[0] leading-[28px] text-[15px] font-medium text-[#3d4750] block tracking-[0.03rem]"
                >
                    Categories
                </a>
                <ul className="mega-menu min-w-full transition-all duration-[0.3s] ease-in-out mt-[25px] pl-[30px] absolute top-[40px] z-[16] text-left opacity-[0] invisible left-[0] right-[auto] bg-[#fff] border-[1px] border-solid border-[#eee] flex flex-col rounded-[10px]">
                    <li className="m-[0] flex items-center">
                        <ul className="mega-block w-[calc(25%-30px)] mr-[30px] py-[15px]">
                            <li className="menu_title border-b-[1px] border-solid border-[#eee] mb-[10px] pb-[5px] flex items-center leading-[28px]">
                                <a
                                    className="transition-all duration-[0.3s] ease-in-out font-Poppins h-[auto] text-[#6c7fd8] text-[15px] font-medium tracking-[0.03rem] block py-[10px] leading-[22px] capitalize"
                                >
                                    Classic
                                </a>
                            </li>
                            <li className="flex items-center leading-[28px]">
                                <a
                                    href="shop-left-sidebar-col-3.html"
                                    className="transition-all duration-[0.3s] ease-in-out font-Poppins py-[10px] leading-[22px] text-[14px] font-normal tracking-[0.03rem] text-[#686e7d] hover:text-[#6c7fd8] capitalize"
                                >
                                    Left sidebar 3 column
                                </a>
                            </li>
                            <li className="flex items-center leading-[28px]">
                                <a
                                    href="shop-left-sidebar-col-4.html"
                                    className="transition-all duration-[0.3s] ease-in-out font-Poppins py-[10px] leading-[22px] text-[14px] font-normal tracking-[0.03rem] text-[#686e7d] hover:text-[#6c7fd8] capitalize"
                                >
                                    Left sidebar 4 column
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </li>
        </>
    )
}

export default HeaderCategoryList