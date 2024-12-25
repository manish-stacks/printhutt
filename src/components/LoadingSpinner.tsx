import React from 'react'
import { RiLoader2Line } from 'react-icons/ri'

const LoadingSpinner = () => {
    return (
        <>
            <div className="flex flex-wrap mt-20 mb-52 justify-center items-center">
                <div className="text-center h-screen mx-auto">
                    {/* <p className="font-serif text-4xl text-brown-800">Loading...</p> */}
                    <div className="flex justify-center mt-4">
                        <RiLoader2Line className="mr-2 h-12 w-12 animate-spin" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoadingSpinner