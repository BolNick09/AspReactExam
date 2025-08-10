const API_URL = "https://localhost:5001/api/auth";

export async function register(username, email, password) 
{
    const response = await fetch(`${API_URL}/register`, 
        {
        method: "POST",
        headers: 
        {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
    });

    if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Ошибка регистрации");
    }

    return await response.json();
}

export async function login(username, password) {
    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Ошибка входа");
    }

    return await response.json();
}