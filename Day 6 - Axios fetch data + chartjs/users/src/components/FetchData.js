import {useEffect, useState} from 'react';
import axios from 'axios';

const FetchData = () =>{
    const [data, setData] = useState([]);
    useEffect(()=>{
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then(res => setData(res.data))
        .catch(err => console.log(err));
    }, [])
    return(
        <div className='flex justify-center mt-10'>
            {/* table */}
            <table>
                <thead>
                    <tr className='border border-black'>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>City</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((user, index)=>{
                            return <tr key={index} className='border border-black'>
                                        <td className='border border-black p-2'>{user.id}</td>
                                        <td className='border border-black p-2'>{user.name}</td>
                                        <td className='border border-black p-2'>{user.email}</td>
                                        <td className='border border-black p-2'>{user.address.city}</td>
                                    </tr>
                        })
                    }
                </tbody>
            </table>
            
        </div>
    )
}

export default FetchData