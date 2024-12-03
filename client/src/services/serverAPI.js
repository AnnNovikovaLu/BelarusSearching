import axios from "axios";
import storageAPI from "./storageAPI";

class ServerAPI {
  baseUrl = "http://localhost:5000/api";

  api = axios.create({
    baseURL: this.baseUrl,
    headers: {
      "Content-Type": "application/json",
    },
  });

  async register(userDto, successCallback, errorCallback) {
    try {
      const response = await this.api.post("auth/registration", {
        name: userDto.name,
        surname: userDto.surname,
        email: userDto.email,
        password: userDto.password,
      });

      successCallback?.(response.data);
    } catch (error) {
      if (error.response) {
        errorCallback?.(error.response.data.message);
      } else {
        errorCallback?.("Error");
      }
    }
  }

  async login(userDto, successCallback, errorCallback) {
    try {
      const response = await this.api.post("auth/login", {
        email: userDto.email,
        password: userDto.password,
      });

      successCallback?.(response.data);
    } catch (error) {
      if (error.response) {
        errorCallback?.(error.response.data.message);
      } else {
        errorCallback?.("Error");
      }
    }
  }

  async updateUserInfo(id, userDto, successCallback, errorCallback) {
    try {
      const token = this.getToken();

      const response = await this.api.patch(
        `users/${id}`,
        {
          ...(userDto.name !== "" ? { name: userDto.name } : {}),
          ...(userDto.surname !== "" ? { surname: userDto.surname } : {}),
          ...(userDto.email !== "" ? { email: userDto.email } : {}),
          ...(userDto.password !== "" ? { password: userDto.password } : {}),
          ...(userDto.oldPassword !== ""
            ? { oldPassword: userDto.oldPassword }
            : {}),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      successCallback?.(response.data);
    } catch (error) {
      if (error.response) {
        errorCallback?.(error.response.data.message);
      } else {
        errorCallback?.("Error");
      }
    }
  }

  async checkUser(callback) {
    try {
      const token = this.getToken();

      const response = await this.api.get("auth/check", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.verification) {
        callback?.({
          isAuthorized: true,
          user: response.data,
          isVerified: true,
        });
      }
      callback?.({
        isAuthorized: true,
        user: response.data,
        isVerified: false,
      });
    } catch {
      callback?.({ isAuthorized: false, user: undefined, isVerified: false });
    }
  }

  async verify(verificationDto, successCallback, errorCallback) {
    try {
      const token = this.getToken();

      const response = await this.api.post("verification", verificationDto, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      successCallback?.(response.data);
    } catch (error) {
      if (error.response) {
        errorCallback?.(error.response.data.message);
      } else {
        errorCallback?.("Error");
      }
    }
  }

  async updateVerification(
    id,
    verificationDto,
    successCallback,
    errorCallback
  ) {
    try {
      const token = this.getToken();

      const response = await this.api.patch(
        `verification/${id}`,
        verificationDto,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      successCallback?.(response.data);
    } catch (error) {
      if (error.response) {
        errorCallback?.(error.response.data.message);
      } else {
        errorCallback?.("Error");
      }
    }
  }

  async getAvailableHosts(params) {
    const response = await this.api.get("hosts/available");

    return response.data;
  }

  logout() {
    storageAPI.remove("token");
  }

  //   async getMovies(params: ISearch): Promise<IMoviesResponse> {
  //     const response = await this.api.get('movies', {
  //       params: {
  //         ...(params.search !== '' ? { search: params.search } : {}),
  //         ...(params.sortBy !== '' ? { sortBy: params.sortBy } : {}),
  //         ...(params.sortOrder !== '' ? { sortOrder: params.sortOrder } : {}),
  //         page: params.page,
  //         limit: params.limit,
  //       },
  //     });

  //     return response.data;
  //   }

  //   async getMovie(
  //     id: number,
  //     errorCallback: (message: string) => void,
  //   ): Promise<IMovie | undefined> {
  //     try {
  //       const response = await this.api.get(`movies/${id}`);

  //       return response.data;
  //     } catch {
  //       errorCallback?.('Nothing was found');
  //     }
  //   }

  getToken() {
    return storageAPI.get("token");
  }

  setToken(token) {
    storageAPI.set("token", token);
  }
}

const serverAPI = new ServerAPI();
export default serverAPI;
