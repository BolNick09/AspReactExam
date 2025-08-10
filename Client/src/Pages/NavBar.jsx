import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
    return (
        <nav style={{ padding: "10px", borderBottom: "1px solid gray" }}>
            <Link to="/" style={{ marginRight: "10px" }}>Главная</Link>
            <Link to="/game" style={{ marginRight: "10px" }}>Игра</Link>
            <Link to="/results" style={{ marginRight: "10px" }}>Рекорды</Link>
            <Link to="/login" style={{ marginRight: "10px" }}>Вход</Link>
            <Link to="/register">Регистрация</Link>
        </nav>
    );
}