import React from 'react'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
)
const PieChart = ({chartdata}) => {
    return (
        <div className='w-72'>
          <Pie data={chartdata}/>
        </div>
    )
}

export default PieChart
