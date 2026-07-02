import React, { useState, useEffect } from 'react'
import { MdOutlineDateRange, MdCurrencyRupee, MdOutlineTitle, MdAddCircleOutline } from 'react-icons/md'
import { BiDollar } from 'react-icons/bi'
import { FiTag } from 'react-icons/fi'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import Category from './Category'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import toast from 'react-hot-toast'

const AddExpenses = ({ addExpenses, updateExpenses, currency, notification }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false)
  const [Selected, setSelected] = useState("")

  const location = useLocation();
  const editData = location.state;


  const [formData, setformData] = useState({
    title: "",
    amount: "",
    category: "",
    date: null,
    notes: ""
  })

  useEffect(() => {
    if (editData) {
      setformData(editData)
      setSelected(editData.category)
    }
  }, [editData])


  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.title) {
      if (notification) {
        toast.error("Enter title")
      }
      return
    }

    if (isNaN(formData.amount) || formData.amount <= 0) {
      if (notification) {
        toast.error("Enter valid amount")
      }
      return
    }

    if (!formData.category) {
      if (notification) {
        toast.error("Select Category")
      }
      return
    }
    if (!formData.date) {
      if (notification) {
        toast.error("Select Date")
      }
      return
    }

    if (formData.id) {
      updateExpenses(formData)
    }
    else {
      addExpenses(formData)
    }
    setformData({
      title: "",
      amount: "",
      category: setSelected(null),
      date: null,
      notes: ""
    })
  }

  return (
    <form onSubmit={handleSubmit} className='text-white'>
      <p className='text-3xl font-bold'>Add New Expenses</p>
      <p className='text-gray-400 text-lg'>Fill in the details below to add a new expenses</p>

      <div className='bg-[#1e2938] flex-1 justify-between p-6 mt-5'>
        <div className='grid grid-cols-2 gap-5'>

          <div className='relative flex flex-col gap-3 h-[15vh]'>
            <p className='text-xl'>Title</p>
            <input value={formData.title} name='title' onChange={handleChange} type="text" placeholder='e.g. Burger King' className='bg-gray-900 py-2 px-10 outline-0 border border-gray-400 rounded-lg text-xl' />
            <MdOutlineTitle className='text-2xl absolute top-13 left-3' />
          </div>
          <div className='relative flex flex-col gap-3 h-[15vh]'>
            <p className='text-xl'>Amount</p>
            <input value={formData.amount} name='amount' onChange={handleChange} type="text" className='bg-gray-900 py-2 px-10 outline-0 border border-gray-400 rounded-lg text-xl' />
            {currency === "INR" ?
              <MdCurrencyRupee className='text-2xl absolute top-13 left-3' /> : currency === "USD" ?
                <BiDollar className='text-2xl absolute top-13 left-3' /> : ""
            }
          </div>
          <div className='relative flex flex-col gap-3 h-[15vh]'>
            <p className='text-xl'>Category</p>
            <div name="category" value={formData.category} onClick={() => setOpen(!open)} className='bg-gray-900 py-2 px-10 outline-0 border border-gray-400 rounded-lg text-xl'>
              {Selected || "Select Category"}
            </div>
            {open && (
              <div className='absolute w-fit  bg-[#1e2938] top-25 left-60 text-xl border border-gray-400'>
                {["Food", "Transport", "Shopping", "Entertainment", "Bills & Utilities"].map((item) => (
                  <div key={item} className='px-4 py-2 hover:bg-[#334155] cursor-pointer'
                    onClick={() => {
                      setSelected(item);
                      setOpen(false)
                      setformData({ ...formData, category: item })
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}
            <FiTag className='text-2xl absolute top-13 left-3' />
          </div>
          <div className='relative flex flex-col gap-3 h-[15vh]'>
            <p className='text-xl'>Date</p>
            <DatePicker selected={formData.date} onChange={(d) =>
              setformData({ ...formData, date: d })
            } className='bg-gray-900 w-full text-white py-2 pl-10 pr-3 outline-0 border border-gray-400 rounded-lg text-xl' />
            <MdOutlineDateRange className='text-2xl absolute top-13 left-3' />
          </div>

        </div>

        <div className='flex flex-col gap-3'>
          <p className='text-xl'>Notes(Optional)</p>
          <textarea name="notes" value={formData.notes} onChange={handleChange} className='w-full bg-gray-900 rounded-lg min-h-20 p-3 text-lg  border border-gray-400 outline-0' placeholder='Add a note about this expense'></textarea>
        </div>

        <div className='flex flex-row justify-end gap-5 py-5 '>
          <button onClick={() => setformData({
            ...formData, title: "", amount: "", category: setSelected(null), date: null, notes: ""
          })} type='button' className='px-5 py-2 border border-gray-400 font-bold rounded-lg'>Cancel</button>
          <button type='submit' onClick={(e) => { formData.id ? navigate("/expenses") : "" }}  className='px-5 py-2 flex flex-row justify-center items-center bg-purple-600 rounded-lg font-bold'><MdAddCircleOutline />{formData.id ? "Update Expense" : "Add Expnese"}</button>
        </div>

      </div>
    </form>
  )
}

export default AddExpenses