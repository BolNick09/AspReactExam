const API_URL = "https://localhost:5001/api/GameResults";

export async function saveGameResult(score, timeInSeconds, clicks) {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Токен не найден. Войдите в систему.");
  }
  const response = await fetch(`${API_URL}/save`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ score, timeInSeconds, clicks })
  });
}



export async function getAllResults() 
{
  const response = await fetch(API_URL);
  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "Failed to fetch results");
  }
  return await response.json();
}

export async function getMyResults(token) {
  const response = await fetch(`${API_URL}/my`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "Failed to fetch my results");
  }
  return await response.json();
}