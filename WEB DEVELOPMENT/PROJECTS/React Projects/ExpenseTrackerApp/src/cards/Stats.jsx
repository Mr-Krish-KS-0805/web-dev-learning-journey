import React, { useState } from 'react'
import { IoWalletOutline } from 'react-icons/io5'
import { CiMenuKebab } from 'react-icons/ci';
import { useLocation, useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Label } from 'recharts';


const Stats = ({ expenses, showAmount, setShowAmount, exportCsv }) => {
    const [showMenu, setshowMenu] = useState(null)
    const [avgType, setavgType] = useState(false)
    const navigate = useNavigate();

    const TotalSpending = (expenses) => {
        let total = 0;
        expenses.forEach(item => {
            total += Number(item.amount);
        });

        return total
    }

    const ThisMonth = (expenses) => {
        let AllthisMonth = 0;
        expenses.forEach(item => {
            if (new Date(item.date).getMonth() == new Date().getMonth()) {
                AllthisMonth += Number(item.amount)
            }
        });

        return AllthisMonth
    }

    const AverageDaily = (expenses) => {
        if (expenses.length === 0) {
            return 0
        } else {
            const total = expenses.reduce((sum, item) => sum + Number(item.amount) || 0, 0)
            const days = new Set(expenses.map(item => new Date(item.date).toDateString())).size
            if (days === 0) return 0
            return Math.floor(total / days)
        }
    }
    const MonthlyAverage = (expenses) => {
        const now = new Date()
        const monthData = expenses.filter(item => {
            const d = new Date(item.date)
            return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
        })
        const total = monthData.reduce((sum, item) => sum + Number(item.amount), 0)
        const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()
        return Math.floor(total / daysInMonth)
    }

    const formatedate = (date) => {
        return new Date(date).toLocaleDateString("en-Us", {
            month: "short",
            day: 'numeric',
            year: 'numeric'
        })
    }

    const getMenuOptions = (type) => {
        if (type === "spending") {
            return [
                { lable: "View Details", action: "view" },
                { lable: "Refresh", action: "refresh" },
                { lable: showAmount ? "Hide Amount" : "Show Amount", action: "Hide" },
                { lable: "Export Data(PDf)", action: "pdf" },
                { lable: "Export Data(CSV)", action: "csv" }
            ]
        }

        if (type === "month") {
            return [
                { lable: "Refresh", action: "refresh" },
                { lable: "Export This Month(PDF)", action: "pdfMonth" },
                { lable: "View Monthly Details", action: "viewMonths" }
            ]
        }

        if (type === "transaction") {
            return [
                { lable: "View Details", action: "view" }
            ]
        }

        if (type === "avg") {
            return [
                { lable: avgType ? "Avg per Active Day" : "Avg per Day(This month)", action: "monavg" },
                { lable: "How it's calculated", action: "info" }

            ]
        }

        return []
    }

    const handleMenuActions = (action) => {
        if (action === "refresh") window.location.reload()
        if (action === "Hide") setShowAmount(!showAmount)
        if (action === "pdf") exportPdf(expenses, "All_Expenses")
        if (action === "csv") exportCsv()
        if (action === "view") navigate("/expenses")
        if (action === "pdfMonth") exportPdf(monthData, "Monthly_Report")
        if (action === "viewMonths") navigate("/expenses", { state: { filter: "month" } })
        if (action === "info") alert("Total spending divided by total number of days.")
        if (action === "monavg") setavgType(!avgType)
    }

    const now = new Date();
    const monthData = expenses.filter(item => {
        const d = new Date(item.date);
        return d.getMonth() === now.getMonth() &&
            d.getFullYear() === now.getFullYear()
    })

    const exportPdf = (data, title = "Expense_Report") => {
        const doc = new jsPDF();
        doc.setFillColor(63, 81, 181);
        doc.rect(0, 0, 210, 30, "F");

        doc.setTextColor(255, 255, 255);
        doc.setFontSize(22);
        doc.text("SpendWise - Expense Report", 14, 15);

        doc.setFontSize(10)
        doc.setTextColor(220, 225, 255);
        doc.text(`Generated on: ${formatedate(new Date())}`, 14, 22);

        const tableHeader = [["Title", "Category", "Date", "Amount (INR)"]];
        const tableRows = data.map((exp) => [
            exp.title,
            exp.category,
            formatedate(exp.date),
            `Rs ${exp.amount}`
        ]);

        autoTable(doc, {
            startY: 38,
            head: tableHeader,
            body: tableRows,

            styles: {
                font: "helvetica",
                fontSize: 11,
                cellPadding: 5,
                textColor: [0, 0, 0],
                fontStyle: "normal"
            },

            headStyles: {
                fillColor: [63, 81, 181],
                textColor: [255, 255, 255],
                fontStyle: "bold",
                fontSize: 12
            },
            alternateRowStyles: {
                fillColor: [250, 251, 254]
            },

            gridLineColor: [200, 200, 200],
            lineWidth: 0.1

        });
        doc.save(`${title}.pdf`);
    }





    return (
        <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-5 pb-5'>
            <div className='relative py-1 px-4 flex gap-3 items-center rounded-lg border-2 border-gray-700 bg-[#1e2938]'>

                <div className='bg-[#7c3aed] w-15 h-15 rounded-full flex items-center justify-center'><IoWalletOutline className='text-white text-3xl ' /></div>
                <div className='flex flex-col'>
                    <span className='text-1rem text-gray-400'>Total Spending</span>
                    <span className='text-white text-2xl font-bold'>{showAmount ? `₹${TotalSpending(expenses)}` : "₹XXXX    "}</span>
                    <span className='text-green-600'>↑ 12.5% <span className='text-gray-400'>vs Apr</span></span>
                </div>
                <div onClick={() => setshowMenu(showMenu === "spending" ? null : "spending")} className='absolute top-2 right-2 text-white text-2xl'><CiMenuKebab /></div>
                {showMenu === "spending" &&
                    <div className='absolute text-white right-0 top-10 bg-[#1e2938] border border-gray-400 text-sm'>
                        <ul className='flex flex-col gap- px-1 py-1'>

                            {getMenuOptions("spending").map((item, i) => (
                                <li key={i} onClick={(e) => { e.stopPropagation(); handleMenuActions(item.action); setshowMenu("") }} className='hover:bg-gray-400 px-2 py-1 cursor-pointer'>{item.lable}</li>
                            ))}

                        </ul>
                    </div>
                }
            </div>

            <div className='relative py-1 px-4 flex gap-3 items-center rounded-lg border-2 border-gray-700 bg-[#1e2938]'>
                <div className='bg-[#108981] w-15 h-15 rounded-full flex items-center justify-center'><IoWalletOutline className='text-white text-3xl ' /></div>
                <div className='flex flex-col'>
                    <span className='text-1rem text-gray-400'>This Month</span>
                    <span className='text-white text-2xl font-bold'>₹{ThisMonth(expenses)}</span>
                    <span className='text-green-600 '>↑ 12.5% <span className='text-gray-400'>vs Apr</span></span>
                </div>
                <div onClick={() => setshowMenu(showMenu === "month" ? null : "month")} className='absolute top-2 right-2 text-white text-2xl'><CiMenuKebab /></div>
                {showMenu === "month" &&
                    <div className='absolute text-white right-0 top-10 bg-[#1e2938] border border-gray-400 text-sm'>
                        <ul className='flex flex-col gap- px-1 py-1'>

                            {getMenuOptions("month").map((item, i) => (
                                <li onClick={(e) => { e.stopPropagation(); handleMenuActions(item.action); setshowMenu("") }} className='hover:bg-gray-400 px-2 py-1 cursor-pointer'>{item.lable}</li>
                            ))}

                        </ul>
                    </div>
                }
            </div>
            <div className='relative py-1 px-4 flex gap-3 items-center rounded-lg border-2 border-gray-700 bg-[#1e2938]'>
                <div className='bg-[#f59e08] w-15 h-15 rounded-full flex items-center justify-center'><IoWalletOutline className='text-white text-3xl ' /></div>
                <div className='flex flex-col'>
                    <span className='text-1rem text-gray-400'>Total Transactions</span>
                    <span className='text-white text-2xl font-bold'>{expenses.length}</span>
                    <span className='text-green-600'>↑ 8.3% <span className='text-gray-400'>vs Apr</span></span>
                </div>
                <div onClick={() => setshowMenu(showMenu === "transaction" ? null : "transaction")} className='absolute top-2 right-2 text-white text-2xl'><CiMenuKebab /></div>
                {showMenu === "transaction" &&
                    <div className='absolute text-white right-0 top-10 bg-[#1e2938] border border-gray-400 text-sm'>
                        <ul className='flex flex-col gap- px-1 py-1'>

                            {getMenuOptions("transaction").map((item, i) => (
                                <li onClick={(e) => { e.stopPropagation(); handleMenuActions(item.action); setshowMenu("") }} className='hover:bg-gray-400 px-2 py-1 cursor-pointer'>{item.lable}</li>
                            ))}

                        </ul>
                    </div>
                }
            </div>
            <div className='relative py-1 px-4 flex gap-3 items-center rounded-lg border-2 border-gray-700 bg-[#1e2938]'>
                <div className='bg-[#06b6d4] w-15 h-15 rounded-full flex items-center justify-center'><IoWalletOutline className='text-white text-3xl ' /></div>
                <div className='flex flex-col'>
                    <span className='text-1rem text-gray-400'>{avgType ? "Avg per Day(This month)" : "Avg per Active Day"}</span>
                    <span className='text-white text-2xl font-bold'>₹{avgType ? MonthlyAverage(expenses) : AverageDaily(expenses)}</span>
                    <span className='text-green-600'>↑ 10.2% <span className='text-gray-400'>vs Apr</span></span>
                </div>
                <div onClick={() => setshowMenu(showMenu === "avg" ? null : "avg")} className='absolute top-2 right-2 text-white text-2xl'><CiMenuKebab /></div>
                {showMenu === "avg" &&
                    <div className='absolute text-white right-0 top-10 bg-[#1e2938] border border-gray-400 text-sm'>
                        <ul className='flex flex-col gap- px-1 py-1'>

                            {getMenuOptions("avg").map((item, i) => (
                                <li onClick={(e) => { e.stopPropagation(); handleMenuActions(item.action); setshowMenu("") }} className='hover:bg-gray-400 px-2 py-1 cursor-pointer'>{item.lable}</li>
                            ))}

                        </ul>
                    </div>
                }
            </div>
        </div>
    )
}

export default Stats
