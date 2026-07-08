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
import Signup from './pages/Signup'
import Login from './pages/Login'
import { v4 as uuidv4 } from 'uuid'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import { Navigate } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import PublicRoute from './components/PublicRoute'
import { collection, addDoc, getDocs, query, where, deleteDoc, updateDoc, doc, onSnapshot } from 'firebase/firestore'
import { db } from './firebase'
import toast, { Toaster } from 'react-hot-toast'
import Swal from 'sweetalert2'
import { getDoc } from 'firebase/firestore'
import DashboardSkeleton from './components/DashboardSkeleton'

function App() {

  const [user, setUser] = useState(null)
  const [name, setName] = useState("")
  const [DOB, setDOB] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [gender, setGender] = useState("")
  const [location, setLocation] = useState("")
  const [loading, setLoading] = useState(true)
  const [expenses, setExpenses] = useState([])
  const [notification, setNotification] = useState(true)

  useEffect(() => {
    const fetchExpenses = async () => {
      if (!user) return

      const q = query(
        collection(db, "expenses"),
        where("uid", "==", user.uid)
      )

      const querySnapshot = await getDocs(q)
      const loadedExpenses = [];

      querySnapshot.forEach(doc => {
        loadedExpenses.push({
          ...doc.data(), firestoreId: doc.id,
          date: doc.data().date.toDate()
        })
      });

      setExpenses(loadedExpenses)
    }
    fetchExpenses()
  }, [user])


  const [UserData, setUserData] = useState(null)


  useEffect(() => {
    if (!user) return;

    const getUserData = onSnapshot(
      doc(db, "users", user.uid),
      (docSnap) => {
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      }
    )
  }, [user])



  const [showAmount, setShowAmount] = useState(() => {
    const saved = localStorage.getItem("showAmount");
    return (saved === null) ? true : JSON.parse(saved)
  })

  const [currency, setCurrency] = useState(() => {
    const saved = localStorage.getItem("currency");
    return (saved === null || saved === "undefined") ? "INR" : saved
  })

  const [budget, setBudget] = useState("")
  const [alertShown, setAlertShown] = useState(false)

  useEffect(() => {
    localStorage.setItem("showAmount", JSON.stringify(showAmount))
    localStorage.setItem("currency", currency)
  }, [expenses, showAmount, currency])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])



  const ThisMonth = (expenses) => {
    let AllthisMonth = 0;
    expenses.forEach(item => {
      if (new Date(item.date).getMonth() == new Date().getMonth() && new Date(item.date).getFullYear() === new Date().getFullYear()) {
        AllthisMonth += Number(convertAmount(item.amount).toFixed(2))
      }
    });

    return AllthisMonth
  }

  const addExpenses = async (data) => {
    const newExpenses = {
      id: uuidv4(),
      title: data.title,
      amount: Number(data.amount),
      category: data.category,
      date: data.date,
      notes: data.notes,
    }
    setExpenses((prev) => [...prev, newExpenses])

    const docRef = await addDoc(collection(db, "expenses"), {
      ...newExpenses,
      uid: user.uid
    })

    newExpenses.firestoreId = docRef.id
    if (notification) {
      toast.success("Expense Added")
    }
  }

  const updateExpenses = async (updateData) => {

    await updateDoc(
      doc(db, "expenses", updateData.firestoreId),
      {
        ...updateData
      }
    )

    setExpenses((prev) => prev.map((item) =>
      item.id === updateData.id ? updateData : item
    ))

    if (notification) {
      toast.success("Expense updated")
    }
  }

  const confirmDelete = (id) => {
    Swal.fire({
      title: "Delete Expense?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "cancel"
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(id)

        if (notification) {
          toast.success("Expense Deleted")
        }
      }
    })

  }
  const handleDelete = async (id) => {

    const expensesToDelete = expenses.find(item => item.id === id)

    await deleteDoc(
      doc(
        db, "expenses", expensesToDelete.firestoreId
      )
    )

    const updateExpenses = expenses.filter((t) => t.id !== id)
    setExpenses(updateExpenses)

  }

  const confirmDeleteAll = () => {
    Swal.fire({
      title: "Delete All Expense?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete All",
      cancelButtonText: "cancel"
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteAll()
        if (notification) {
          toast.success("All Expense Deleted")
        }
      }
    })

  }

  const handleDeleteAll = async () => {

    await Promise.all(
      expenses.map((expenses) =>
        deleteDoc(
          doc(db, "expenses", expenses.firestoreId)
        )
      )
    )
    setExpenses([])

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

    if (notification) {
      toast.success("Export Completed")
    }
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

  const getSymbol = () => {
    if (currency === "INR") {
      return "₹"
    }

    if (currency === "USD") {
      return "$"
    }
  }

  const rates = {
    INR: 1,
    USD: 0.012
  }

  const convertAmount = (amount) => {
    return amount * rates[currency]
  }

  const displayAmount = (amount) => {
    return `${getSymbol()} ${convertAmount(amount).toFixed(2)}`
  }

  if (loading) {
    return <DashboardSkeleton />
  }


  return (
    <>
      <Toaster />
      <Routes>
        {/* Protected Routes  */}
        <Route path='/' element={<ProtectedRoute user={user}> <MainLayout UserData={UserData} formatedate={formatedate} name={name} setName={setName} DOB={DOB} setDOB={setDOB} email={email} setEmail={setEmail} phone={phone} setPhone={setPhone} gender={gender} setGender={setGender} location={location} setLocation={setLocation} /> </ProtectedRoute>}>
          <Route index element={<Dashboard expenses={expenses} showAmount={showAmount} setShowAmount={setShowAmount} exportCsv={exportCsv} getSymbol={getSymbol} displayAmount={displayAmount} convertAmount={convertAmount} notification={notification} />} />
          <Route path='/add' element={<AddExpenses addExpenses={addExpenses} updateExpenses={updateExpenses} currency={currency} notification={notification} />} />
          <Route path='/expenses' element={<Expenses expenses={expenses} confirmDelete={confirmDelete} showAmount={showAmount} setShowAmount={setShowAmount} exportCsv={exportCsv} getSymbol={getSymbol} displayAmount={displayAmount} convertAmount={convertAmount} notification={notification} />} />
          {/* <Route path='/category' element={<Category />} /> */}
          <Route path='/report' element={<Report />} />
          <Route path='/budget' element={<Budget />} />
          <Route path='/recurring' element={<Recurring />} />
          <Route path='/setting' element={<Setting expenses={expenses} setExpenses={setExpenses} showAmount={showAmount} setshowAmount={setShowAmount} setNotification={setNotification} notification={notification} exportCsv={exportCsv} improtCsv={improtCsv} currency={currency} setCurrency={setCurrency} getSymbol={getSymbol} budget={budget} setBudget={setBudget} confirmDeleteAll={confirmDeleteAll} />} />
        </Route>

        {/* Public Routes */}
        <Route path='/signup' element={<PublicRoute user={user}><Signup name={name} DOB={DOB} email={email} phone={phone} setDOB={setDOB} setName={setName} setPhone={setPhone} setEmail={setEmail} /></PublicRoute>} />
        <Route path='/login' element={<PublicRoute user={user}><Login /></PublicRoute>} />

      </Routes>
    </>
  )
}

export default App
