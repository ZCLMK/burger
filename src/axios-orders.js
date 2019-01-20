import axios from "axios";

const instance = axios.create({
  baseURL: "https://burger-81173.firebaseio.com"
});

export default instance;
