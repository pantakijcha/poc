"use client";
import axios from "axios";

let token
if (typeof window !== 'undefined') {
  // Perform localStorage action
  token = sessionStorage?.getItem('token')
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 1000,
  headers: {
    Accept: "application/json",
    Authorization: token ? `Bearer ${token}` : undefined
  },
});


export default api