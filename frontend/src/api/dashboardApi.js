import axios from "./axiosInstance";

export const getDashboardStats = () => axios.get("/dashboard");

export const getRecentCandidates = () => axios.get("/candidates");

export const getStageDistribution = () => axios.get("/reports/stages");

export const getCandidateSources = () => axios.get("/reports/sources");