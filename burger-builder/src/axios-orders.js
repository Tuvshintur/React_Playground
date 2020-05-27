import axios from "axios";

const instance = axios.create({
    baseURL: "https://tutorial-56fd9.firebaseio.com",
});

export default instance;
