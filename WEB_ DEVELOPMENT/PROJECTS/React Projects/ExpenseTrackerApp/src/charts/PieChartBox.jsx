import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'


const COLORS = {
  Food: '#7c3aed',
  Transport: '#2563eb',
  Shopping: '#22c55e',
  Entertainment: '#f97316',
  'Bills & Utilities' : '#f59e0b'
}

const PieChartBox = ({ data }) => {

  return (
    <div className='w-full h-full'>
      <ResponsiveContainer width={200} height={200} >
        <PieChart >
          <Pie data={data}
            dataKey="value"
            innerRadius={40}
            outerRadius={90}
            paddingAngle={1}>

            {
              data.map((item, index) => (
                <Cell
                  key={item.name}
                  fill={COLORS[item.name]}
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
