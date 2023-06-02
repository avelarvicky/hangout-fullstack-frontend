import axios from "axios";

/* Axios Service that deals with Hangout Requests */

class HangoutsService {
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_APP_SERVER_URL || "http://localhost:5005",
    });

    // Automatically set JWT token in the headers for every request
    this.api.interceptors.request.use((config) => {
      // Retrieve the JWT token from the local storage
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }

  // POST /api/hangouts
  createHangout = (requestBody) => {
    return this.api.post("/api/hangouts", requestBody);
  };

  // GET /api/hangouts
  getAllHangouts = () => {
    console.log('im here')
    return this.api.get("/api/hangouts");
  };

  // GET /api/hangouts/:id
  getHangout = (id) => {
    return this.api.get(`/api/hangouts/${id}`);
  };

  // PUT /api/hangouts/:id
  updateHangout = (id, requestBody) => {
    return this.api.put(`/api/hangouts/${id}`, requestBody);
  };

  // DELETE /api/hangouts/:id
  deleteHangout = (id) => {
    return this.api.delete(`/api/hangouts/${id}`);
  };
}

// Create one instance object
const hangoutsService = new HangoutsService();

export default hangoutsService;