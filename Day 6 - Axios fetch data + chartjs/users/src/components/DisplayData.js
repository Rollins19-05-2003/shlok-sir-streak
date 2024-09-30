import React, { useState } from 'react'
import BarChart from '../charts/BarChart'
import LineChart from '../charts/LineChart'
import DoughnutChart from '../charts/DoughnutChart'
import PieChart from '../charts/PieChart'

const DisplayData = () => {
    const [data, setData] = useState({
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: 'Number of Votes',
            data: [12, 19, 3, 5, 2, 3],
            borderColor : "black",
            borderWidth: 1,
            backgroundColor:[
                "red",
                "blue",
                "yellow",
                "green",
                "purple",
                "orange"
            ]
        }]
    })

  return (
    <>
        <h1 className='font-bold text-2xl text-center my-10'>Visual Representation of Data</h1>
        <div className='flex justify-between'>
        <BarChart chartdata={data}/>
        <LineChart chartdata={data}/>
        <DoughnutChart chartdata={data}/>
        <PieChart chartdata={data}/>
        </div>
    </>
  )
}

export default DisplayData
