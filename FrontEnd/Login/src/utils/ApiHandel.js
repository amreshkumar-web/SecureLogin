import axios from "axios";

let navigateFunction = null; // Store the navigate function

export const setNavigate = (navigate) => {
    navigateFunction = navigate;
};

const api = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true, // ✅ Ensures cookies (authToken & refreshToken) are sent automatically
});







// ✅ Add interceptor to attach `x-xsrf-token` for every POST & PUT request
api.interceptors.request.use(
    (config) => {
        const xsrfToken = localStorage.getItem("xCsrfToken"); // Get token from localStorage
        if (xsrfToken && (config.method === "post" || config.method === "put" || config.method ==='delete' || config.method ==='get')) {
            config.headers["x-xsrf-token"] = xsrfToken; // Attach token to headers
        }
        return config;
    },
    (error) => Promise.reject(error)
);








// ✅ Handle token expiration and refresh logic
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // ✅ Hit refresh token API (Cookies will automatically be sent)
                await axios.post("http://localhost:5000/user/refreshSession", {}, { withCredentials: true });

                // ✅ Retry the original request (Cookies already updated with new access token)
                return api(originalRequest);
            } catch (refreshError) {
                console.error("Token refresh failed", refreshError);

                // ✅ Clear cookies & redirect to login
                document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
              
                navigateFunction("/");
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;
