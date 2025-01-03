import Footer from '@/components/Footer';
import Header from '@/components/Header';
import React, { ReactNode } from 'react'

interface LayoutProps {
    children: ReactNode;
}

const App = ({ children }: LayoutProps) => {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    )
}

export default App