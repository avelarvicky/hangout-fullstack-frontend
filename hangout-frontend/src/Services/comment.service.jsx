import axios from "axios";

/* Axios Service that deals with Project Requests */

class CommentsService {
	constructor() {
		this.api = axios.create({
			baseURL:
				import.meta.env.VITE_APP_SERVER_URL || "http://localhost:5005",
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

	// POST /api/comments
	createComment = (requestBody) => {
		return this.api.post("/api/comments", requestBody);
	};

	// GET /api/comments
	getAllComments = () => {
		return this.api.get("/api/comments");
	};

	// GET /api/comments/:id
	getComment = (id) => {
		return this.api.get(`/api/comments/${id}`);
	};

	// PUT /api/comments/:id
	updateComment = (id, requestBody) => {
		return this.api.put(`/api/comments/${id}`, requestBody);
	};

	// DELETE /api/projects/:id
	deleteComment = (id) => {
		return this.api.delete(`/api/comments/${id}`);
	};
}

// Create one instance object
const commentsService = new CommentsService();

export default commentsService;
