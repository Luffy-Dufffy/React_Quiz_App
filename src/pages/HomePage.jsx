import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate(); 

    const handleStartQuiz = async () => {
        var attempt = await createAttempt();
        if (attempt.error) {
            console.log(attempt.message);
            return;
        }
        console.log(attempt.message);
        setQuizAttempt(attempt.message);
        navigate('/play-quiz');
    }
    return (
        <div className='flex justify-center items-center w-screen h-screen'>
            <button className='py-2 px-6 border bg-indigo-500 text-white min-w-20 rounded-md' onClick={handleStartQuiz}>Start Quiz</button>
        </div>
    )
}

export default HomePage