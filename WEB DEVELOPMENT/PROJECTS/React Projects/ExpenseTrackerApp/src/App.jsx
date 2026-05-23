import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import MainLayout from './layouts/MainLayout'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import AddExpenses from './pages/AddExpenses'
import Expenses from './pages/Expenses'
import Report from './pages/Report'
import Budget from './pages/Budget'
import Recurring from './pages/Recurring'
import Setting from './pages/Setting'
import { v4 as uuidv4 } from 'uuid'

function App() {
  const [expenses, setExpenses] = useState(() => {
    const data = localStorage.getItem("expenses");
    const saved = localStorage.getItem("showAmount");
    return data ? JSON.parse(data) : [];
  })
  const [showAmount, setShowAmount] = useState(() => {
    const saved = localStorage.getItem("showAmount");
    return saved !== null ? JSON.parse(saved) : true
  })

  const [theme, setTheme] = useState("light")

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [theme])



  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses))
    localStorage.setItem("showAmount", JSON.stringify(showAmount))
  }, [expenses, showAmount])


  const addExpenses = (data) => {
    const newExpenses = {
      id: uuidv4(),
      title: data.title,
      amount: Number(data.amount),
      category: data.category,
      date: data.date,
      notes: data.notes
    }
    setExpenses((prev) => [...prev, newExpenses])
  }

  const updateExpenses = (updateData) => {
    setExpenses((prev) => prev.map((item) =>
      item.id === updateData.id ? updateData : item
    ))
  }

  const confirmDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      handleDelete(id)
    }
  }

  const handleDelete = (id) => {
    const updateExpenses = expenses.filter((t) => t.id !== id)
    setExpenses(updateExpenses)
  }




  return (

    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route index element={<Dashboard expenses={expenses} showAmount={showAmount} setShowAmount={setShowAmount} />} />
        <Route path='/add' element={<AddExpenses addExpenses={addExpenses} updateExpenses={updateExpenses} />} />
        <Route path='/expenses' element={<Expenses expenses={expenses} confirmDelete={confirmDelete} showAmount={showAmount} setShowAmount={setShowAmount} />} />
        {/* <Route path='/category' element={<Category />} /> */}
        <Route path='/report' element={<Report />} />
        <Route path='/budget' element={<Budget />} />
        <Route path='/recurring' element={<Recurring />} />
        <Route path='/setting' element={<Setting expenses={expenses} showAmount={showAmount} setshowAmount={setShowAmount} setTheme={setTheme} theme={theme} />} />
      </Route>
    </Routes>
  )
}

export default App
