class ImageAPI {
  baseUrl = "http://localhost:5000";

  getImage(image) {
    return `${this.baseUrl}/${image}`;
  }
}

const imageAPI = new ImageAPI();
export default imageAPI;
