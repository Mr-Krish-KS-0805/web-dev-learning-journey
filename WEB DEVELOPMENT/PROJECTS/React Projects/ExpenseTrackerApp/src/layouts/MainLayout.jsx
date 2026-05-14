import React from 'react'
import Sidebar from '../components/Sidebar'
import Dashboard from '../pages/Dashboard'
const MainLayout = () => {
    return (
        <>
            <div className='min-h-screen overflow-hidden  bg-[#0f172a] flex flex-row'>

                {/* sidebar */}
                <div className='hidden xl:block h-full '>
                    <Sidebar />
                </div>

                {/* Dashboard */}
                <div className='flex-1 h-screen px-5 '>
                    <Dashboard />
                </div>

            </div>
        </>
    )
}

export default MainLayout
