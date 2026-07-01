import React from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'

const MainLayout = ({ expenses, UserData, formatedate }) => {
    return (
        <>
            <div className='min-h-screen overflow-hidden bg-[#0f172a] flex flex-row'>

                {/* sidebar */}
                <div className='hidden xl:block h-full '>
                    <Sidebar />
                </div>

                {/* Dashboard */}
                <div className='flex-1 h-screen px-5 '>
                    <Header UserData={UserData} formatedate={formatedate} />
                    <div className=''>
                        <Outlet />
                    </div>
                </div>

            </div>
        </>
    )
}

export default MainLayout
