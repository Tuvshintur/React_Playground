import axios from "axios";

const instance = axios.create({
    baseURL: "https://burgerbui-4d00e.firebaseio.com/",
});

export default instance;
