import { Grid } from '@material-ui/core';
import * as React from 'react';

import { GamesContext } from '../contexts/GamesContext';
import { IGames } from '../models/Games';
import { Statistics } from './Statistics';
import { Upload } from './Upload';

export const App = () => {
	const [games, setGames] = React.useState<IGames>({ games: [] });

	return (
		<Grid container={true} justify='center'>
			<GamesContext.Provider value={[games, setGames]}>
				<Upload />
				<Statistics />
			</GamesContext.Provider>
		</Grid>
	);
};
