import axios from "axios";

export const api = axios.create({
    baseURL: "https://689c192058a27b18087ce67f.mockapi.io/country"
})


// export const api2 = axios.create({
//     baseURL: "https://6852a7200594059b23ce857f.mockapi.io/"
// })