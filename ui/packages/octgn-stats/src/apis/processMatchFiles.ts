import axios from 'axios';

import { IGame } from '../models/Game';
import { IMatchToUpload } from '../models/MatchToUpload';

interface IApiResponse {
	match_date: string;
	match_id: string;
	player1_damage_received: number;
	player1_deck: string;
	player1_name: string;
	player2_damage_received: number;
	player2_deck: string;
	player2_name: string;
	winner: string;
}

export const processMatchFiles = async (match: IMatchToUpload) => {
	const formData = new FormData();
	formData.append('file_o8h', match.o8h!, match.o8h!.name);
	formData.append('file_o8l', match.o8l!, match.o8l!.name);

	return new Promise<IGame[]>(async (resolve, reject) => {
		try {
			const response = await axios.post('/api/process-match-files', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});

			const games: IGame[] = response.data.games.map((game: IApiResponse) => ({
				matchDate: new Date(game.match_date),
				matchId: game.match_id,
				matchName: match.name,
				player1DamageReceived: game.player1_damage_received,
				player1Deck: game.player1_deck,
				player1Name: game.player1_name,
				player2DamageReceived: game.player2_damage_received,
				player2Deck: game.player2_deck,
				player2Name: game.player2_name,
				winner: game.winner,
			}));

			resolve(games);
		} catch (error) {
			reject(error);
		}
	});
};
