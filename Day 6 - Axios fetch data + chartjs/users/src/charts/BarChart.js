import React from 'react'
import {Bar} from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale
)

const BarChart = ({chartdata}) => {
  return (
    <div className='w-96'>
      <Bar data={chartdata}/>
    </div>
  )
}

export default BarChart
