import { Grid, makeStyles } from '@material-ui/core';
import * as React from 'react';

import { GamesContext } from '../contexts/GamesContext';

const useStyles = makeStyles((theme) => ({
	grid: {
		margin: `0 ${theme.spacing(1)}px`,
		width: 1200,
		[theme.breakpoints.down('sm')]: {
			width: 'calc(100% - 20px)'
		},
	},
}));

export const Statistics = () => {
	const [games] = React.useContext(GamesContext);

	const classes = useStyles();

	return (
		<Grid spacing={1} alignItems='center' justify='center' container={true} className={classes!.grid}>
			<h1>Games: {games.games.length}</h1>
		</Grid>
	);
};
