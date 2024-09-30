import React from 'react'
import {Line} from "react-chartjs-2";
import { Chart as ChartJS, LineElement, PointElement } from 'chart.js';

ChartJS.register(
    LineElement,
    PointElement
)

const LineChart = ({chartdata}) => {
  return (
    <div className='w-96'>
      <Line data={chartdata}/>
    </div>
  )
}

export default LineChart
