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

  const formatedate = (date) => {
    return new Date(date).toLocaleDateString("en-Us", {
      month: "short",
      day: 'numeric',
      year: 'numeric'
    })
  }

  const exportCsv = () => {
    const headers = ["Title, Category, Date, Amount (INR) \n"]
    const tableRows = expenses.map((exp) => {
      const title = exp?.title || "NO Title";
      const category = exp?.category || "NO Categorty"
      const date = exp?.date || "No Date"
      const amount = exp?.amount || 0

      return `${title}, ${category}, ${new Date(date).toLocaleDateString()}, Rs.${amount},`;
    })

    const csvContent = headers.concat(tableRows).join("\n")

    const blob = new Blob([csvContent], { type: "text/csv; charset=utf-8;" })

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "SpendWise_Expense_Report.csv");

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const improtCsv = (file) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const text = event.target.result;

      const rows = text.split("\n").slice(1);

      const newData = rows
        .filter(row => row.trim() !== "")

        .map(row => {

          const parts = row.split(",");

          // saftey check
          if (parts.length < 4) return null;
          let [title, category, date, amount] = parts;

          // clean values 
          title = title?.trim();
          category = category?.trim()

          let fixedDate = "";
          if (date) {
            const d = date.trim().split("/");
            if (date.length <= 10) {
              let day = d[0].padStart(2, "0");
              let month = d[1].padStart(2, "0");
              let year = d[2];

              fixedDate = `${month}/${day}/${year}`;
            }
          }
          console.log(fixedDate)

          let fixedAmount = Number(amount.replace(/[^0-9]+/g, ""));
          return {
            id: uuidv4(),
            title,
            category,
            date: formatedate(fixedDate),
            amount: fixedAmount
          };
        });
      setExpenses(prev => [...prev, ...newData]);
    }
    reader.readAsText(file);
  }



  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route index element={<Dashboard expenses={expenses} showAmount={showAmount} setShowAmount={setShowAmount} exportCsv={exportCsv} />} />
        <Route path='/add' element={<AddExpenses addExpenses={addExpenses} updateExpenses={updateExpenses} />} />
        <Route path='/expenses' element={<Expenses expenses={expenses} confirmDelete={confirmDelete} showAmount={showAmount} setShowAmount={setShowAmount} exportCsv={exportCsv}   />} />
        {/* <Route path='/category' element={<Category />} /> */}
        <Route path='/report' element={<Report />} />
        <Route path='/budget' element={<Budget />} />
        <Route path='/recurring' element={<Recurring />} />
        <Route path='/setting' element={<Setting expenses={expenses} setExpenses={setExpenses} showAmount={showAmount} setshowAmount={setShowAmount} exportCsv={exportCsv} improtCsv={improtCsv} />} />
      </Route>
    </Routes>
  )
}

export default App
