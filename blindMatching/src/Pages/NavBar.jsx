// import React from "react";
// import { Link } from "react-router-dom";

// export default function NavBar() {
//     return (
//         <nav style={{ padding: "10px", borderBottom: "1px solid gray" }}>
//             <Link to="/" style={{ marginRight: "10px" }}>Главная</Link>
//             <Link to="/game" style={{ marginRight: "10px" }}>Игра</Link>
//             <Link to="/results" style={{ marginRight: "10px" }}>Рекорды</Link>
//             <Link to="/login" style={{ marginRight: "10px" }}>Вход</Link>
//             <Link to="/register">Регистрация</Link>
//         </nav>
//     );
// }


import React from "react";
import { Link, useLocation } from "react-router-dom";
import './NavBar.css'; // Создадим отдельный CSS файл

export default function NavBar() {
    const location = useLocation();
    
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-brand">
                    🎮 Memory Game
                </div>
                <div className="navbar-menu">
                    <Link 
                        to="/" 
                        className={`navbar-link ${location.pathname === "/" ? "active" : ""}`}
                    >
                        🏠 Главная
                    </Link>
                    <Link 
                        to="/game" 
                        className={`navbar-link ${location.pathname === "/game" ? "active" : ""}`}
                    >
                        🎯 Играть
                    </Link>
                    <Link 
                        to="/results" 
                        className={`navbar-link ${location.pathname === "/results" ? "active" : ""}`}
                    >
                        🏆 Рекорды
                    </Link>
                    <Link 
                        to="/login" 
                        className={`navbar-link ${location.pathname === "/login" ? "active" : ""}`}
                    >
                        🔐 Вход
                    </Link>
                    <Link 
                        to="/register" 
                        className={`navbar-link ${location.pathname === "/register" ? "active" : ""}`}
                    >
                        📝 Регистрация
                    </Link>
                </div>
            </div>
        </nav>
    );
}