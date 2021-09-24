import axios from "axios";

let http = axios.create({
	baseURL: process.env.REACT_APP_BACKEND_API_URI,
});

export default http;
