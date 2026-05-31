import axios from 'axios';
import type { GameResponse, StartGameRequest } from '../types/blackjack';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const startGame = async (
  request: StartGameRequest
): Promise<GameResponse> => {
  const response = await api.post<GameResponse>('/games/start', request);
  return response.data;
};

export const getGame = async (gameId: number): Promise<GameResponse> => {
  const response = await api.get<GameResponse>(`/games/${gameId}`);
  return response.data;
};

export const hitGame = async (gameId: number): Promise<GameResponse> => {
  const response = await api.post<GameResponse>(`/games/${gameId}/hit`);
  return response.data;
};

export const standGame = async (gameId: number): Promise<GameResponse> => {
  const response = await api.post<GameResponse>(`/games/${gameId}/stand`);
  return response.data;
};

export const nextRound = async (gameId: number, bet: number): Promise<GameResponse> => {
  const response = await api.post<GameResponse>(`/games/${gameId}/next-round`, { bet });
  return response.data;
};

export default api;