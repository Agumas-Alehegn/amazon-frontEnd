import axios from "axios";
const axiosInstance = axios.create({
  baseURL: " http://localhost:2323",
});
export { axiosInstance };
