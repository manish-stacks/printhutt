import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState, useRef, useEffect } from 'react';
import { FaUser } from 'react-icons/fa';
import { RiLogoutBoxFill, RiSettings2Fill } from 'react-icons/ri';
import { toast } from 'react-toastify';


export function UserMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

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
            router.push("/login");
        } catch (error) {
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
                <span className="hidden sm:inline">John Doe</span>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                    <a
                        href="/profile"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                        <FaUser className="h-4 w-4" />
                        Profile
                    </a>
                    <a
                        href="/settings"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                        <RiSettings2Fill className="h-4 w-4" />
                        Settings
                    </a>
                    <button
                        onClick={logOut}
                        className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                        <RiLogoutBoxFill className="h-4 w-4" />
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
}