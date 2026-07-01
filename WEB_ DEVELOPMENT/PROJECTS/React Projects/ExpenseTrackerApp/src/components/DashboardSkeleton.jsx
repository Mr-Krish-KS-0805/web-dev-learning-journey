import React from 'react'

const DashboardSkeleton = () => {
    return (
        <>
            <div className='min-h-screen overflow-hidden bg-[#0f172a] flex flex-row '>

                {/* sidebar */}
                <div className='hidden xl:block h-full '>
                    <div className='h-screen flex flex-col overflow-y-auto w-55 border-r border-gray-500 py-2'>
                        <div className='bg-[#334155] animate-pulse mx-2 rounded-xl h-19 '></div>

                        <div className='text-[#e2e8f0] pt-2 pl-5  flex flex-col gap-5 '>
                            <a className='pl-5 py-5 rounded-l-full bg-[#334155] animate-pulse'></a>
                        </div >

                        <div className='mt-auto flex flex-col gap-2'>
                            <div className='bg-[#334155] animate-pulse w-[90%] h-46.5 mx-3 px-3 py-4 rounded-xl'></div>
                        </div>
                    </div >
                </div >

                {/* Dashboard */}
                < div className='flex-1 h-screen px-2 mt-5 ' >

                    {/* header */}
                    <div className='w-full bg-[#334155] animate-pulse h-15 rounded-xl mb-3 py-5'></div>

                    {/* stats */}
                    <div className='grid grid-cols-4 gap-5 mx-3 pb-5'>
                        {[1, 2, 3, 4].map((item) => (
                            <div key={item} className='py-1 px-4 flex gap-3 rounded-lg h-22 bg-[#334155] animate-pulse'></div>
                        ))}
                    </div>

                    <div className='flex flex-col xl:grid xl:grid-cols-[3.15fr_1fr] gap-5 mx-3'>
                        <div className='flex flex-col gap-5 '>
                            <div className='grid grid-cols-2 gap-5'>
                                <div className='bg-[#334155] animate-pulse h-68 rounded-xl'></div>
                                <div className='bg-[#334155] animate-pulse h-68 rounded-xl'></div>
                            </div >
                            <div className='bg-[#334155] animate-pulse h-57 rounded-xl'></div>
                        </div>

                        <div className='w-full grid grid-cols-[1fr_1fr] lg:flex lg:flex-col gap-5 '>
                            <div className='bg-[#334155] animate-pulse h-46 rounded-xl'></div>
                            <div className='bg-[#334155] animate-pulse h-78 rounded-xl'></div>
                        </div>
                    </div>

                </div >


            </div >

        </>
    )
}

export default DashboardSkeleton
