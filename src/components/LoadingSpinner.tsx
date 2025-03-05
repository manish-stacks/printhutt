import React from 'react'
// import { RiLoader2Line } from 'react-icons/ri'

const LoadingSpinner = () => {
    return (
        <>
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-gray-600">Loading ...</p>
            </div>
            {/* <RiLoader2Line className="mr-2 h-12 w-12 animate-spin" /> */}
        </>
    )
}

export default LoadingSpinner