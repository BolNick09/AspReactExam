// Client/src/Pages/Login.jsx
import React, { useState } from "react";
import { login } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

export default function LoginPage() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const data = await login(username, password);

            // Сохраняем токен
            localStorage.setItem("token", data.token);

            // Декодируем токен и достаём имя пользователя
            const decoded = jwtDecode(data.token);
            const userNameFromToken = decoded?.unique_name || decoded?.sub || username;

            console.log("Вошёл пользователь:", userNameFromToken);

            alert(`Вы успешно вошли как ${userNameFromToken}`);
            navigate("/");
        } catch (err) {
            setError(err.message || "Ошибка входа");
        }
    }

    return (
        <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
            <h2>Вход</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Имя пользователя</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Пароль</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Войти</button>
            </form>
        </div>
    );
}