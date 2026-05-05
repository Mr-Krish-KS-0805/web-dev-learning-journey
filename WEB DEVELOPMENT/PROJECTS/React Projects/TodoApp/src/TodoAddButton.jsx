import React from 'react'
import { CiMenuKebab } from 'react-icons/ci'
import { HiPlusSm } from "react-icons/hi"

const TodoAddButton = (props) => {
    const { setshow, show } = props;
    return (
        <>
            <div className="bottomNavbar absolute bottom-2  w-80 flex items-center justify-center">
                <button onClick={() => setshow(!show)}> <div className="cursor-pointer add text-3xl w-15 h-15 rounded-full bg-[#ff0000] flex justify-center items-center active:text-2xl active:border-2 active:border-black "><HiPlusSm /></div></button>
            </div>
        </>
    )
}

export default TodoAddButton
