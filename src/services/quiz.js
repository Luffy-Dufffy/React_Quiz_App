import { API_BASE_URL } from "./constant";

const QUIZ_URL = `${API_BASE_URL}quiz/`;


export const createAttempt = async () => {
    const key = JSON.parse(localStorage.getItem('user'))?.key;
    const response = await fetch(`${QUIZ_URL}attempt/create/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${key}`,
        },
    });

    const jsonResponse = await response.json();

    if (!response.ok) {
        console.log(jsonResponse);
        return { error: true, message: jsonResponse };
    }
    return { error: false, message: jsonResponse };
}