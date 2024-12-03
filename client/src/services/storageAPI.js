class StorageAPI {
  get(key) {
    return localStorage.getItem(key);
  }
  set(key, value) {
    localStorage.setItem(key, value);
  }
  remove(key) {
    localStorage.removeItem(key);
  }
}

const storageAPI = new StorageAPI();
export default storageAPI;
