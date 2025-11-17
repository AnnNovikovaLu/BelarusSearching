class ImageAPI {
  baseUrl = import.meta.env.VITE_API_URL;

  getImage(image) {
    return `${this.baseUrl}/${image}`;
  }
}

const imageAPI = new ImageAPI();
export default imageAPI;
