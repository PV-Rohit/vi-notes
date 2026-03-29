import axios from 'axios';

const API_URL = 'https://vi-notes-gxri.onrender.com';

export const loginUser = async (credentials: { email: string; password: string }) => {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    return response.data;
};

export const registerUser = async (userData: { email: string; password: string; name: string }) => {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    return response.data;
};

export const saveSession = async (
    sessionData: { text: string; keystrokes: any[]; pasteCount: number; pastedLength: number },
    token: string
) => {
    const response = await axios.post(`${API_URL}/sessions`, sessionData, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};
