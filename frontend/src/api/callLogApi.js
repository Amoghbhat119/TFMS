import axios from "./axiosInstance";

export const getCallLogs = () =>
  axios.get("/calllogs");

export const addCallLog = (data) =>
  axios.post("/calllogs", data);

export const deleteCallLog = (id) =>
  axios.delete(`/calllogs/${id}`);