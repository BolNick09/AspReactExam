const API_URL = "https://localhost:5001/api/GameResults";

export async function saveGameResult(score, token) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(score)
  });

  if (!response.ok) {
    throw new Error("Failed to save result");
  }

  return await response.json();
}

export async function getAllResults() {
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