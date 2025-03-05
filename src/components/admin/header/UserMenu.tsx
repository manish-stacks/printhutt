import axios from 'axios';
// import { Line } from 'fabric';
import Link from 'next/link';
import React, { useState, useRef, useEffect } from 'react';
import { FaUser } from 'react-icons/fa';
import { RiLogoutBoxFill, RiSettings2Fill } from 'react-icons/ri';
import { toast } from 'react-toastify';


export function UserMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    // const router = useRouter();

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);



    const logOut = async () => {
        try {
            await axios.get("/api/auth/logout");
            toast("logout successfully");

            window.localStorage.removeItem('user-store');
            window.location.reload();
            //return router.push("/login");
      
        } catch {
            toast.error("Whoops Server error");
        }
    };


    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 rounded-full border border-gray-200 p-1 pr-4 hover:bg-gray-100"
            >
                <div className="rounded-full bg-gray-200 p-1">
                    <FaUser className="h-5 w-5" />
                </div>
                <span className="hidden sm:inline">PrintHutt</span>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
                    <div className="px-4 py-2 border-b">
                        <p className="font-medium">PrintHutt</p>
                        {/* <p className="text-sm text-gray-500">john@example.com</p> */}
                    </div>

                    <Link
                        href="/admin/profile-settings"
                        className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                        <RiSettings2Fill size={16} />
                        <span>Profile Settings</span>
                    </Link>

                    <button
                        onClick={logOut}
                        className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-gray-100 transition-colors"
                    >
                        <RiLogoutBoxFill size={16} />
                        <span>Logout</span>
                    </button>
                </div>
            )}
        </div>
    );
}