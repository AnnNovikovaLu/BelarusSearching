// verifiedUsersService.js
const API_URL = `${import.meta.env.VITE_API_URL}/api/verification`; // Убедитесь, что это правильный URL вашего API

export const fetchVerifiedUsers = async (page = 1, limit = 3) => {
  try {
    const response = await fetch(`${API_URL}?page=${page}&limit=${limit}`); // Добавьте параметры страницы и лимита
    const text = await response.text();
    const data = JSON.parse(text);

    return data;
  } catch (error) {
    console.error("Error fetching verified users:", error);
    return { data: [], pagination: { total_pages: 1 } };
  }
};
