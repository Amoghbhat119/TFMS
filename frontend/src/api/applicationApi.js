import axios from "./axiosInstance";

export const getApplications = () => axios.get("/applications");

export const updateStage = (id, stage) =>
  axios.put(`/applications/${id}/stage`, { stage });

export const deleteApplication = (id) =>
  axios.delete(`/applications/${id}`);