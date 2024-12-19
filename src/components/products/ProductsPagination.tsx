import React from 'react'

const ProductsPagination = () => {
    return (
        <>
            <div className="w-full px-[12px]">
                <div className="bb-pro-pagination mb-[24px] flex justify-between max-[575px]:flex-col max-[575px]:items-center">
                    <p className="font-Poppins text-[15px] text-[#686e7d] font-light leading-[28px] tracking-[0.03rem] max-[575px]:mb-[10px]">
                        Showing 1-12 of 21 item(s)
                    </p>
                    <ul className="flex">
                        <li className="leading-[28px] mr-[6px] active">
                            <a
                                href="javascript:void(0)"
                                className="transition-all duration-[0.3s] ease-in-out w-[32px] h-[32px] font-light text-[#777] leading-[32px] bg-[#f8f8fb] font-Poppins tracking-[0.03rem] text-[15px] flex text-center align-top justify-center items-center rounded-[10px] border-[1px] border-solid border-[#eee] hover:bg-[#3d4750] hover:text-[#fff]"
                            >
                                1
                            </a>
                        </li>
                        <li className="leading-[28px] mr-[6px]">
                            <a
                                href="javascript:void(0)"
                                className="transition-all duration-[0.3s] ease-in-out w-[32px] h-[32px] font-light text-[#777] leading-[32px] bg-[#f8f8fb] font-Poppins tracking-[0.03rem] text-[15px] flex text-center align-top justify-center items-center rounded-[10px] border-[1px] border-solid border-[#eee] hover:bg-[#3d4750] hover:text-[#fff]"
                            >
                                2
                            </a>
                        </li>
                        <li className="leading-[28px] mr-[6px]">
                            <a
                                href="javascript:void(0)"
                                className="transition-all duration-[0.3s] ease-in-out w-[32px] h-[32px] font-light text-[#777] leading-[32px] bg-[#f8f8fb] font-Poppins tracking-[0.03rem] text-[15px] flex text-center align-top justify-center items-center rounded-[10px] border-[1px] border-solid border-[#eee] hover:bg-[#3d4750] hover:text-[#fff]"
                            >
                                3
                            </a>
                        </li>
                        <li className="leading-[28px] mr-[6px]">
                            <a
                                href="javascript:void(0)"
                                className="transition-all duration-[0.3s] ease-in-out w-[32px] h-[32px] font-light text-[#777] leading-[32px] bg-[#f8f8fb] font-Poppins tracking-[0.03rem] text-[15px] flex text-center align-top justify-center items-center rounded-[10px] border-[1px] border-solid border-[#eee] hover:bg-[#3d4750] hover:text-[#fff]"
                            >
                                4
                            </a>
                        </li>
                        <li className="leading-[28px]">
                            <a
                                href="javascript:void(0)"
                                className="next transition-all duration-[0.3s] ease-in-out w-[auto] h-[32px] px-[13px] font-light text-[#fff] leading-[30px] bg-[#3d4750] font-Poppins tracking-[0.03rem] text-[15px] flex text-center align-top justify-center items-center rounded-[10px] border-[1px] border-solid border-[#eee]"
                            >
                                Next{" "}
                                <i className="ri-arrow-right-s-line transition-all duration-[0.3s] ease-in-out ml-[10px] text-[16px] w-[8px] text-[#fff]" />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default ProductsPagination