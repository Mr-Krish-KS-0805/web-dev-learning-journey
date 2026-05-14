import React from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

const data = [
    { day: 'May 21', amount: 600 },
    { day: 'May 4', amount: 1200 },
    { day: 'May 9', amount: 900 },
    { day: 'May 15', amount: 500 },
    { day: 'May 24', amount: 300 },
    { day: 'May 26', amount: 1870 },
    { day: 'May 30', amount: 680 },
]
const LineChartBox = () => {
    return (
        <div className='w-full h-full'>
            <ResponsiveContainer>
                <LineChart data={data}>
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
                        dataKey={"amount"}
                        stroke='#7c3aed'
                        strokeWidth={3}
                    />

                </LineChart>
            </ResponsiveContainer>

        </div>
    )
}

export default LineChartBox
