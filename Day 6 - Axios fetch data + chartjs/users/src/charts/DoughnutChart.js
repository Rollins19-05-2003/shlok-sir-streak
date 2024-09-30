import React from 'react'
import {Doughnut} from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
)

const DoughnutChart = ({chartdata}) => {
    return (
      <div className='w-72'>
        <Doughnut data={chartdata}/>
      </div>
    )
  }


export default DoughnutChart
