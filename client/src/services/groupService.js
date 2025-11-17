const API_URL = `${import.meta.env.VITE_API_URL}/api/groups`;

export const fetchGroups = async (page = 1, limit = 3) => {
  try {
    const response = await fetch(`${API_URL}?page=${page}&limit=${limit}`);
    const text = await response.text();
    const data = JSON.parse(text);

    return data;
  } catch (error) {
    console.error("Error fetching groups:", error);
    return { data: [], pagination: { total_pages: 1 } };
  }
};
