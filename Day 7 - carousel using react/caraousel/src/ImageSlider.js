import React, { useEffect, useState } from 'react'

const data = [
"https://img.freepik.com/free-vector/tropical-leaves-background-zoom_23-2148580778.jpg?w=1800&t=st=1727719411~exp=1727720011~hmac=e0fddbc4770407c6610d372b6d59e921801f4d8d958930c4cabe346283bd523a",
"https://img.freepik.com/free-vector/colorful-palm-silhouettes-background_23-2148541792.jpg?size=626&ext=jpg&ga=GA1.1.627294587.1727719351&semt=ais_hybrid",
"https://img.freepik.com/free-photo/majestic-mountain-peak-tranquil-winter-landscape-generated-by-ai_188544-15662.jpg?w=2000&t=st=1727719446~exp=1727720046~hmac=82fea8cbbcb75f3557cd8fb126a821dc6226be04db94a3833321ef081b184c7a",
"https://img.freepik.com/free-photo/abstract-multi-colored-illustration-nature-vibrant-beauty-generated-by-ai_188544-15591.jpg?w=2000&t=st=1727719464~exp=1727720064~hmac=867b2da7f8eb5b41f279ac7996dfd2e05a086fe53cb12228d2ad92b5e639564a",
"https://img.freepik.com/free-photo/leaf-nature-backgrounds-pattern-illustration-plant-backdrop-design-abstract-vibrant-green-nature-wallpaper-illustration-generative-ai_188544-12680.jpg?t=st=1727719177~exp=1727722777~hmac=404c43086ce0623f0680bf5423cdf8b586ca1729c1317b075aaffefc6184691f&w=2000"
]

const ImageSlider = () => {
    const [currIndex, setCurrIndex] = useState(0);

    useEffect(()=>{
        const timer = setTimeout(()=>{
            handleNext();
        }, 5000)

        return ()=>{
            clearTimeout(timer);
        };
    }, [currIndex])

    const handlePrev = () =>{
        if(currIndex == 0) setCurrIndex(data.length - 1);
        else setCurrIndex(currIndex - 1);
    }

    const handleNext = () =>{
        setCurrIndex((currIndex+1) % data.length)
    }    

    return (
        <div className='flex justify-center mt-32'>
            <button onClick={handlePrev} className='p-4 bg-gray-200 h-fit rounded-md mt-40'>Prev</button>
            {
                data.map((url, i)=>(
                    <img key={url} src={url} className={"w-[600px] h-96 mx-20 " + (currIndex === i ? "block" : "hidden")} alt="wallpaper"/>
                ))
            }
            <button onClick={handleNext} className='p-4 bg-gray-200 h-fit rounded-md mt-40'>Next</button>
        </div>
    )
}

export default ImageSlider
