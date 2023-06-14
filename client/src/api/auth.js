import axios from 'axios';

const API = 'http://localhost:3000/api/v1/users'

export const registerRequest = user => axios.post(`${API}`, user)