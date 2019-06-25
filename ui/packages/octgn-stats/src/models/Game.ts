export interface IGame {
	matchId: string;
	matchDate: Date;
	matchName: string;
	player1DamageReceived: number;
	player1Deck: string;
	player1Name: string;
	player2DamageReceived: number;
	player2Deck: string;
	player2Name: string;
	winner: string;
}
