import axios from "axios";

const axiosInstance = axios.create({
    baseURL : "http://localhost:5000",
    // headers: {
    //     'Content-Type': 'application/json',
    //   }
});

axiosInstance.interceptors.request.use((config) => {
    try {
        const accessToken = JSON.parse(sessionStorage.getItem('accessToken')) || "";

    if(accessToken){
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    } catch (error) {
        console.error("Error parsing accessToken:", error);
    }
    return config;
},(err) => Promise.reject(err))
export default axiosInstance;