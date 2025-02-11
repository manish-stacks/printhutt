import { useUserStore } from '@/store/useUserStore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react'
import { RiBankCard2Fill, RiHeart2Fill, RiHome2Fill, RiLogoutCircleRFill, RiMap2Fill, RiMessage2Fill, RiShoppingCartFill, RiStarHalfFill, RiUser2Fill } from 'react-icons/ri'
import { toast } from 'react-toastify';


interface Props {
    activemenu: string;
}
const UserSidebar = ({ activemenu }: Props) => {

    // const router = useRouter();
    const logoutStore = useUserStore((state) => state.logout);

    const logOut = async () => {
        await logoutStore();
        toast("logout successfully");
        // return router.push("/login");
        window.localStorage.removeItem('user-store');
        window.location.reload();
    };

    return (
        <>
            <aside className="w-full md:w-1/4 lg:w-1/5 bg-white p-4 shadow-md border ">
                <div className="text-center mb-8">
                    <h2 className="text-xl font-semibold mt-4">Michle Obema</h2>
                    <p className="text-gray-500">Welcome, Michle Obema</p>
                </div>
                <nav className="space-y-2 text-lg leading-9">
                    <Link
                        href="/user/dashboard"
                        className={`flex items-center hover:text-purple-600 ${activemenu == 'dashboard' ? ' text-purple-600 font-semibold' : 'text-gray-600'}`}
                    >
                        <span className="mr-2">
                            <RiHome2Fill />
                        </span>{" "}
                        Dashboard
                    </Link>
                    <Link
                        href="/user/profile"
                        className={`flex items-center hover:text-purple-600 ${activemenu == 'profile' ? ' text-purple-600 font-semibold' : 'text-gray-600'}`}
                    >
                        <span className="mr-2">
                            <RiUser2Fill />
                        </span>{" "}
                        My Profile
                    </Link>
                    <Link
                        href="/user/address"
                        className={`flex items-center hover:text-purple-600 ${activemenu == 'address' ? ' text-purple-600 font-semibold' : 'text-gray-600'}`}
                    >
                        <span className="mr-2">
                            <RiMap2Fill />
                        </span>{" "}
                        My Adddress
                    </Link>
                    <a
                        href="#"
                        className={`flex items-center hover:text-purple-600 ${activemenu == '' ? ' text-purple-600 font-semibold' : 'text-gray-600'}`}
                    >
                        <span className="mr-2">
                            <RiMessage2Fill />
                        </span>{" "}
                        Message
                        <span className="ml-auto bg-purple-600 text-white text-xs rounded-full px-2 py-1">
                            12
                        </span>
                    </a>
                    <Link
                        href="/wishlist"
                        className={`flex items-center hover:text-purple-600 ${activemenu == 'wishlist' ? ' text-purple-600 font-semibold' : 'text-gray-600'}`}
                    >
                        <span className="mr-2">
                            <RiHeart2Fill />
                        </span>{" "}
                        Wishlist
                    </Link>
                    <a
                        href="#"
                        className={`flex items-center hover:text-purple-600 ${activemenu == '' ? ' text-purple-600 font-semibold' : 'text-gray-600'}`}
                    >
                        <span className="mr-2">
                            <RiStarHalfFill />
                        </span>{" "}
                        Reviews
                    </a>
                    <a
                        href="#"
                        className={`flex items-center hover:text-purple-600 ${activemenu == '' ? ' text-purple-600 font-semibold' : 'text-gray-600'}`}
                    >
                        <span className="mr-2">
                            <RiBankCard2Fill />
                        </span>{" "}
                        Payment
                    </a>
                    <Link
                        href="/user/orders"
                        className={`flex items-center hover:text-purple-600 ${activemenu == 'orders' ? ' text-purple-600 font-semibold' : 'text-gray-600'}`}
                    >
                        <span className="mr-2">
                            <RiShoppingCartFill />
                        </span>{" "}
                        Order History
                    </Link>
                </nav>
                <div className="mt-8 border-t pt-4 text-lg">
                    <p className="text-gray-400 text-sm">Seting</p>
                    <button
                        onClick={logOut}
                        className="flex items-center text-gray-600 hover:text-purple-600 mt-2 cursor-pointer"
                    >
                        <span className="mr-2">
                            <RiLogoutCircleRFill />
                        </span>{" "}
                        Log-out
                    </button>
                </div>
            </aside>
        </>
    )
}

export default UserSidebar