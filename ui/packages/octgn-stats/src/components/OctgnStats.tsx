import { CssBaseline, Grid } from '@material-ui/core';
import withStyles, { StyledComponentProps, StyleRulesCallback } from '@material-ui/core/styles/withStyles';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { Header } from '@ff-tcg-stats/header';

const styles: StyleRulesCallback = (theme) => ({
	blockCenter: {
		padding: theme.spacing.unit * 2,
		textAlign: 'center',
	},
	grid: {
		margin: `0 ${theme.spacing.unit * 2}px`,
		width: 1200,
		[theme.breakpoints.down('sm')]: {
			width: 'calc(100% - 20px)'
		},
	},
});

interface IOctgnStatsOwnProps extends RouteComponentProps, StyledComponentProps { }

class OctgnStatsBase extends React.Component<IOctgnStatsOwnProps> {
	public render() {
		const { classes } = this.props;
		const currentPath = this.props.location.pathname;

		return (
			<React.Fragment>
				<CssBaseline />
				<Header currentPath={currentPath} />
				<div className={classes!.root}>
					<Grid container={true} justify='center'>
						<Grid spacing={24} alignItems='center' justify='center' container={true} className={classes!.grid}>
							OCTGN Stats
						</Grid>
					</Grid>
				</div>
			</React.Fragment>
		);
	}
}

export const OctgnStats = withRouter(withStyles(styles)(OctgnStatsBase));
