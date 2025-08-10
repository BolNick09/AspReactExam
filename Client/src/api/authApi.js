import axios from "axios";

// Логин: принимает 1 аргумент — объект { username, password }
// (оставляем имя функции login, чтобы не переименовывать места вызова)
export const login = async (credentials) => {
  try {
    // Убедимся, что отправляем плоский объект с нужными полями
    const payload = {
      Username: credentials.username ?? credentials.Username ?? "", // на всякий случай
      Password: credentials.password ?? credentials.Password ?? ""
    };

    // Отправка к API (ASP.NET обычно не чувствителен к регистру, но явный ключ полезен)
    const response = await axios.post("/api/Auth/Login", payload, {
      headers: { "Content-Type": "application/json" }
    });

    return response.data; // ожидаем { token: "..." }
  } catch (error) {
    // Пробрасываем читабельную ошибку с данными от сервера, если они есть
    if (error.response && error.response.data) {
      // Если сервер вернул объект/строку — пробросим его
      throw error.response.data;
    }
    throw { message: "Ошибка при попытке входа" };
  }
};

// Экспорт остальных функций (если есть) оставляем как были
export const register = async (username, email, password) => {
  try {
    const response = await axios.post("/api/Auth/Register", {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Ошибка при регистрации" };
  }
};