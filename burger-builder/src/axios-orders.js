import axios from "axios";

const instance = axios.create({
    baseURL: "https://burger-a9b76.firebaseio.com/",
});

export default instance;
