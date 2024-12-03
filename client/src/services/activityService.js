import axios from "axios";

const API_URL = "http://localhost:5000/api/activities";
export const fetchActivities = async (page = 1, limit = 3) => {
  try {
    const response = await fetch(`${API_URL}?page=${page}&limit=${limit}`);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const text = await response.text();
    const data = JSON.parse(text);

    return data;
  } catch (error) {
    console.error("Error fetching activities:", error);
    return { data: [], pagination: { total_pages: 1 } };
  }
};

export const createActivity = async (activityData) => {
  try {
    const response = await axios.post(API_URL, activityData, {
      headers: {
        "Content-Type": "multipart/form-data",  
      },
    });
    return response.data; // Возвращаем данные созданной активности
  } catch (error) {
    console.error("Error creating activity:", error);
    throw error; // Можете обработать ошибку по своему усмотрению
  }
};
