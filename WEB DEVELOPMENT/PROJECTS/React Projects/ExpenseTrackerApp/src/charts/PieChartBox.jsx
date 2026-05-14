import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

const data = [
  {
    name: "food",
    value: 5800
  },
  {
    name: "shopping",
    value: 3625
  },
  {
    name: "Transport",
    value: 3625
  },
  {
    name: "Entertainment",
    value: 3625
  }
]

const COLORS = [
  '#7c3aed',
  '#2563eb',
  '#22c55e',
  '#f97316',
]

const PieChartBox = () => {
  return (
    <div className='w-full h-full'>
      <ResponsiveContainer width="100%" height="100%" >
        <PieChart >
          <Pie data={data}
            dataKey="value"
            innerRadius={40}
            outerRadius={90}
            paddingAngle={1}>
              
            {
              data.map((item, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                />
              ))
            }
          </Pie>
        </PieChart>
      </ResponsiveContainer>

    </div>
  )
}

export default PieChartBox
