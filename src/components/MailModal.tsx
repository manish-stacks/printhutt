import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import 'tailwindcss/tailwind.css'
import { userService } from '@/_services/common/userService'
import { toast } from 'react-toastify'

interface ModalProps {
    isOpen?: boolean
    onClose: () => void
}

const MailModal = ({ isOpen, onClose }: ModalProps) => {
    const [email, setEmail] = useState('')

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault()
        console.log('Form submitted:', email)
        try {
            const response = await userService.updateProfile({email});
            console.log(response);
        } catch (error) {
            console.log(error)
            toast.error("Failed to update email");
        } 
        setEmail('')
        onClose()
    }

    const handleClose = () => {
        // Reset form when modal is closed
        setEmail('')
        onClose()
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 bg-gray-800 bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4 "
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="bg-white rounded-lg p-6 shadow-lg relative w-96"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                    >
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                            onClick={handleClose}
                        >
                            Close
                        </button>
                        <form onSubmit={handleSubmit}>

                            <motion.label
                                htmlFor="email"
                                className="block text-gray-700 font-bold mb-2"
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                Email:
                            </motion.label>
                            <motion.input
                                type="email"
                                id="email"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md "
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.4 }}
                            />
                            <div className='text-red-500 mb-4'>Email address is required</div>
                            <motion.button
                                type="submit"
                                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.6 }}
                            >
                                Submit
                            </motion.button>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default MailModal
