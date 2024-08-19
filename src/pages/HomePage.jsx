import React from 'react'
import MyButton from '.././components/MyButton'

const HomePage = () => {
    return (
        <div className="container h-screen w-screen flex flex-col justify-center items-center">
            <div className='min-w-96 flex flex-col justify-center items-center space-y-2 p-4 rounded-md '>
                <MyButton className={'w-full rounded-md shadow-md hover:scale-105 active:scale-95 transition-all duration-200 ease-out'} text={"Play Quiz"} />
                <MyButton className={'w-full rounded-md shadow-md hover:scale-105 active:scale-95 transition-all duration-200 ease-out'} text={"Add Questions"} />
                <MyButton className={'w-full rounded-md shadow-md hover:scale-105 active:scale-95 transition-all duration-200 ease-out'} text={"LeaderBoard"} />
                <MyButton className={'w-full rounded-md shadow-md hover:scale-105 active:scale-95 transition-all duration-200 ease-out'} text={"HighScore"} />

            </div>
        </div>
    );
}


export default HomePage;