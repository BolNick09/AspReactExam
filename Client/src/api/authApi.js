import axios from "axios";

export const login = async (credentials) => {
  try {

    const payload = {
      Username: credentials.username ?? credentials.Username ?? "", 
      Password: credentials.password ?? credentials.Password ?? ""
    };


    const response = await axios.post("/api/Auth/Login", payload, {
      headers: { "Content-Type": "application/json" }
    });

    return response.data; 
  } catch (error) {

    if (error.response && error.response.data) {

      throw error.response.data;
    }
    throw { message: "Ошибка при попытке входа" };
  }
};


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