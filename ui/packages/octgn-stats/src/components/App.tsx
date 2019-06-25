import { Grid } from '@material-ui/core';
import * as React from 'react';

import { GamesContext } from '../contexts/GamesContext';
import { IGame } from '../models/Game';
import { IGames } from '../models/Games';
import { Statistics } from './Statistics';
import { Upload } from './Upload';

export const App = () => {
	const [games, setGames] = React.useState<IGames>({ games: [] });

	React.useEffect(
		() => {
			try {
				if (typeof(Storage) !== 'undefined') {
					const value = JSON.parse(localStorage.getItem('games')!) as IGames | null;
					if (value != null) {
						setGames(value);
					}
				}
			// tslint:disable-next-line:no-empty
			} catch { }
		},
		[],
	);

	const setGamesFunc = (newGames: IGame[]) => {
		if (newGames.length > 0) {
			setGames((oldGames) => {
				const value = {
					games: oldGames!.games.filter((g) => g.matchId !== newGames[0].matchId).concat(newGames)
				};

				if (typeof(Storage) !== 'undefined') {
					localStorage.setItem('games', JSON.stringify(value));
				}

				return value;
			});
		}
	};

	return (
		<Grid container={true} justify='center'>
			<GamesContext.Provider value={[games, setGamesFunc]}>
				<Upload />
				<Statistics />
			</GamesContext.Provider>
		</Grid>
	);
};
