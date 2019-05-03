import { Button, Card, CardActions, CardContent, CssBaseline, Grid } from '@material-ui/core';
import withStyles, { StyledComponentProps, StyleRulesCallback } from '@material-ui/core/styles/withStyles';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { Header } from '@ff-tcg-stats/header';

// tslint:disable-next-line:no-var-requires
const octgnImage = require('../../assets/images/octgn-logo.png');

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

interface IAppOwnProps extends RouteComponentProps, StyledComponentProps { }

class AppBase extends React.Component<IAppOwnProps> {
	public render() {
		const { classes } = this.props;
		const currentPath = this.props.location.pathname;

		return (
			<React.Fragment>
				<CssBaseline />
				<Header currentPath={currentPath} />
				<div className={classes!.root}>
					<Grid container={true} justify='center'>
						OCTGN Stats
					</Grid>
				</div>
			</React.Fragment>
		);
	}
}

export const App = withRouter(withStyles(styles)(AppBase));
