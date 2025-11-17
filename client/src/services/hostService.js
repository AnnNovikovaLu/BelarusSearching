const API_URL = `${import.meta.env.VITE_API_URL}/api/hosts/available`;

export const fetchHosts = async (page = 1, limit = 3) => {
  try {
    const response = await fetch(`${API_URL}?page=${page}&limit=${limit}`);
    const text = await response.text();
    const data = JSON.parse(text);

    return data;
  } catch (error) {
    console.error("Error fetching hosts:", error);
    return { data: [], pagination: { total_pages: 1 } };
  }
};

import axios from "axios";
