import * as React from 'react';

import { IGames } from '../models/Games';

export const GamesContext = React.createContext<[IGames, React.Dispatch<React.SetStateAction<IGames>>]>(
	[
		{ games: [] },
		// tslint:disable-next-line:no-empty
		() => { }
	]
);
