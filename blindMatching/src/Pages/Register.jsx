// import React, { useState } from "react";
// import { register } from "../api/authApi";
// import { useNavigate } from "react-router-dom";

// export default function RegisterPage() {
//     const navigate = useNavigate();
//     const [username, setUsername] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [error, setError] = useState("");

//     async function handleSubmit(e) {
//         e.preventDefault();
//         try {
//             await register(username, email, password);
//             navigate("/login");
//         } catch (err) {
//             setError(err.message || "Ошибка регистрации");
//         }
//     }

//     return (
//         <div className="auth-container">
//             <h2>Регистрация</h2>
//             {error && <p className="error">{error}</p>}
//             <form onSubmit={handleSubmit}>
//                 <input
//                     type="text"
//                     placeholder="Имя пользователя"
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                     required
//                 />
//                 <input
//                     type="email"
//                     placeholder="Email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                 />
//                 <input
//                     type="password"
//                     placeholder="Пароль"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                 />
//                 <button type="submit">Зарегистрироваться</button>
//             </form>
//         </div>
//     );
// }


import React, { useState } from "react";
import { register } from "../api/authApi";
import { useNavigate, Link } from "react-router-dom";

export default function RegisterPage() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await register(username, email, password);
            navigate("/login");
        } catch (err) {
            setError(err.message || "Ошибка регистрации");
        }
    }

    return (
        <div className="page-container">
            <div className="auth-container">
                <h2>📝 Регистрация</h2>
                
                {error && <div className="error-message">{error}</div>}
                
                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="input-group">
                        <label>Имя пользователя</label>
                        <input
                            type="text"
                            placeholder="Придумайте логин"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    
                    <div className="input-group">
                        <label>Email</label>
                        <input
                            type="email"
                            placeholder="Введите ваш email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    
                    <div className="input-group">
                        <label>Пароль</label>
                        <input
                            type="password"
                            placeholder="Придумайте пароль"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    
                    <button type="submit" className="auth-button">
                        Зарегистрироваться
                    </button>
                </form>

                <div className="auth-links">
                    <p>Уже есть аккаунт?</p>
                    <Link to="/login" className="auth-link">
                        Войти
                    </Link>
                </div>
            </div>
        </div>
    );
}