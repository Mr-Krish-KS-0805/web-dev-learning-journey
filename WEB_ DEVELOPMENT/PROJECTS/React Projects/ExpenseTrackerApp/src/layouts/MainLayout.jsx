import React from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'

const MainLayout = ({ UserData, formatedate, name, DOB, email, phone, setName, setDOB, setEmail, setPhone, gender, setGender, location, setLocation }) => {
    return (
        <>
            <div className='min-h-screen overflow-hidden bg-[#0f172a] flex flex-row'>

                {/* sidebar */}
                <div className='hidden xl:block h-full '>
                    <Sidebar />
                </div>

                {/* Dashboard */}
                <div className='flex-1 h-screen px-5 '>
                    <Header UserData={UserData} formatedate={formatedate} name={name} setName={setName} DOB={DOB} setDOB={setDOB} email={email} setEmail={setEmail} phone={phone} setPhone={setPhone} gender={gender} setGender={setGender} location={location} setLocation={setLocation} />
                    <div className=''>
                        <Outlet />
                    </div>
                </div>

            </div>
        </>
    )
}

export default MainLayout
