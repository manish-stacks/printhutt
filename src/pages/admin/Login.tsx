"use client"
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const Login = () => {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);

    const handleLogin = async (e: any) => {
        e.preventDefault();
        const userData = {
            email: e.currentTarget.email.value,
            password: e.currentTarget.password.value,
        };

        if (!userData.email && !userData.password) {
            toast.error("Please fill valid details")
            return
        }
        // console.log(userData)
        try {
            setLoading(true);
            const { data } = await axios.post('/api/auth/admin-login', userData);
            const role = data.role;

            if (role === 'admin') {
                toast.success('welcome back admin');
                router.push('/admin/dashboard');
            } else {
                toast.error('Unauthorized access');
            }
        } catch (error: any) {
            console.log(error.response.data.message)
            toast.error(error.response.data.message || 'Login failed');
        } finally {
            setLoading(false);
        }

    }

    return (
        <>

            <section className="section-login py-[100px] max-[1199px]:py-[35px] bg-slate-100 h-screen ">
                <div className="flex flex-wrap justify-between relative items-center mx-auto min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px]">
                    <div className="flex flex-wrap w-full">

                        <div className="w-full px-[12px] ">
                            <div className="bg-white bb-login-contact max-w-[500px] m-[auto] border-[1px] border-solid border-[#eee] p-[30px] rounded-[10px]">
                                <div className='flex justify-center py-2'>
                                    <Image
                                        src="/print-hutt-logo.webp"
                                        alt="logo"
                                        width={180}
                                        height={56}
                                        className="light w-[180px] max-[991px]:w-[115px] block"
                                        priority={true}
                                    />

                                </div>
                                <p className="text-center text-xl mb-6 px-4 ">
                                    Welcome back admin
                                </p>
                                <form onSubmit={handleLogin}>
                                    <div className="bb-login-wrap mb-[24px]">
                                        <label
                                            htmlFor="email"
                                            className="inline-block font-Poppins text-[15px] font-normal text-[#686e7d] leading-[26px] tracking-[0.02rem]"
                                        >
                                            Email*
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            placeholder="Enter Your Email"
                                            className="w-full p-[10px] text-[14px] font-normal text-[#686e7d] border-[1px] border-solid border-[#eee] outline-[0] leading-[26px] rounded-[10px]"
                                        />
                                    </div>
                                    <div className="bb-login-wrap mb-[24px]">
                                        <label
                                            htmlFor="email"
                                            className="inline-block font-Poppins text-[15px] font-normal text-[#686e7d] leading-[26px] tracking-[0.02rem]"
                                        >
                                            Password*
                                        </label>
                                        <input
                                            type="password"
                                            id="password"
                                            name="password"
                                            placeholder="Enter Your Password"
                                            className="w-full p-[10px] text-[14px] font-normal text-[#686e7d] border-[1px] border-solid border-[#eee] outline-[0] leading-[26px] rounded-[10px]"
                                        />
                                    </div>

                                    <div className="bb-login-button m-[-5px] flex justify-between py-3">

                                        <button type="submit" className={`text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-full
                                        ${loading
                                                ? "cursor-not-allowed"
                                                : ""
                                            }`}>

                                            {loading ? "Verifying..." : "Login"}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login