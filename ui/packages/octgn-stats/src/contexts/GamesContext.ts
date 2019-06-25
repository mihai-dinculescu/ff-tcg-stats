import * as React from 'react';

import { IGame } from '../models/Game';
import { IGames } from '../models/Games';

export const GamesContext = React.createContext<[IGames, (newGames: IGame[]) => void]>(
	[
		{ games: [] },
		// tslint:disable-next-line:no-empty
		() => { }
	]
);
