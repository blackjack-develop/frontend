export type GameStatus =
  | 'PLAYER_TURN'
  | 'DEALER_TURN'
  | 'PLAYER_BUST'
  | 'DEALER_BUST'
  | 'PLAYER_WIN'
  | 'DEALER_WIN'
  | 'PUSH';

export interface StartGameRequest {
  bet: number;
}

export interface GameResponse {
  gameId: number;
  money: number;
  bet: number;
  playerCards: string[];
  dealerCards: string[];
  playerScore: number;
  dealerScoreText: string;
  status: GameStatus;
  message: string;
}