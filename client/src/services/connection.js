import axios from "axios"
import { any } from "prop-types";

let URL = 'http://localhost:3310/api/connection';
const res = {
    success: any,
    data: any,
    error: any
}
const tokenAcces = localStorage.getItem('token');

export const login = async (data) => {
    await axios.post('http://localhost:3310/api/connection/login', data,{
        headers: {  'jwt-token': tokenAcces }}).then((resp) => {
        res.success = resp.data.success;
        res.data = resp.data.data;
        res.error = null;

    }).catch((error) => {
        let err = error;
        if (error.response) {
            err = new Error("server responded");
        } else if (error.request) {
            err = new Error("network error");
        }
        res.error = err;
    });
    return res;
}


export const registedUser = async (data) => {
    URL = "http://localhost:3310/api/connection/register";
    const result = await axios.post(URL, data);
    return result
}

export const updateClient = async (data) => {
    URL = "http://localhost:3310/api/connection/updateClient";
    const result = await axios.put(URL, data);
    return result
}