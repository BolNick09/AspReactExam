import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/authApi";
import { jwtDecode } from "jwt-decode"; 

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {

      const data = await login({ username, password });

      if (!data || !data.token) {

        console.error("Login response unexpected:", data);
        setError("Сервер не вернул токен при входе");
        return;
      }

      localStorage.setItem("token", data.token);

      try {
        const decoded = jwtDecode(data.token);
        console.log("Decoded token:", decoded);
      } catch (dErr) {
        console.warn("Не удалось декодировать JWT:", dErr);
      }

      navigate("/");
    } catch (err) {

      console.error("Login failed:", err);
      const msg = (err && (err.message || JSON.stringify(err))) || "Ошибка входа";
      setError(msg);
    }
  };

  return (
    <div className="login-container">
      <h2>Вход</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Логин</label>
          <input
            type="text"
            placeholder="Введите логин"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Пароль</label>
          <input
            type="password"
            placeholder="Введите пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit">Войти</button>
      </form>
    </div>
  );
};

export default Login;