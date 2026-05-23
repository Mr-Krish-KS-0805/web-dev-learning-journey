import React from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'


const LineChartBox = ({ expenses }) => {

    const formateDate = (date) => {
        return new Date(date).toLocaleDateString('en-Us', {
            month: 'short',
            day: 'numeric'
        })
    }
    const map = {}

    expenses.forEach(item => {
        const date = new Date(item.date).toDateString();

        if (map[date]) {
            map[date] += item.amount;
        } else {
            map[date] = item.amount
        }
    });
    // const data = Object.keys(map).sort((a, b) => new Date(a) - new Date(b)).map(date => ({
    //     day: formateDate(date),
    //     amount: map[date]
    // }))

    const result = []
    const now = new Date();
    const dates = Object.keys(map).map(d => new Date(d)).filter(d => 
        d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
    )
    const start = new Date(Math.min(...dates))
    const end = new Date(Math.max(...dates))

    let current = new Date(start)

    while (current <= end) {
        const key = current.toDateString()
        result.push({
            day: formateDate(current),
            amount: map[key] || 0
        })
        current.setDate(current.getDate() + 1)
    }

    return (
        <div className='w-full h-full'>
            <ResponsiveContainer width={400} >
                <LineChart data={result}>
                    <CartesianGrid
                        strokeDasharray="3 "
                        stroke='#334145' />

                    <XAxis dataKey="day"
                        interval={0}
                        angle={-20}
                        textAnchor='end'
                        stroke='#94a3b8' />

                    <YAxis stroke='#94a3b8' />
                    <Tooltip />

                    <Line
                        type={"monotone"}
                        dataKey="amount"
                        stroke='#7c3aed'
                        strokeWidth={3}
                    />

                </LineChart>
            </ResponsiveContainer>

        </div>
    )
}

export default LineChartBox
