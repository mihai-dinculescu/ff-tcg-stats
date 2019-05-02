import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import withStyles, { StyledComponentProps, StyleRulesCallback } from '@material-ui/core/styles/withStyles';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Card, CardActionArea, CardContent, Typography } from '@material-ui/core';

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

interface IHomeOwnProps extends RouteComponentProps, StyledComponentProps { }

class HomeBase extends React.Component<IHomeOwnProps> {
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
							<Grid item={true} xs={12} md={6}>
								<Card className={classes!.card}>
									<CardActionArea>
										<CardContent>
											<Typography variant='h6' gutterBottom={true}>
												OCTGN
											</Typography>
											<div className={classes!.blockCenter}>
												<Typography color='secondary' variant='h6' gutterBottom={true}>
													Stats
											</Typography>
											</div>
										</CardContent>
									</CardActionArea>
								</Card>
							</Grid>
							<Grid item={true} xs={12} md={6}>
								<Card className={classes!.card}>
									<CardActionArea>
										<CardContent>
											<Typography variant='h6' gutterBottom={true}>
												&nbsp;
											</Typography>
											<div className={classes!.blockCenter}>
												<Typography color='secondary' variant='h6' gutterBottom={true}>
													&nbsp;
												</Typography>
											</div>
										</CardContent>
									</CardActionArea>
								</Card>
							</Grid>
							<Grid item={true} xs={12} md={6}>
								<Card className={classes!.card}>
									<CardActionArea>
										<CardContent>
											<Typography variant='h6' gutterBottom={true}>
												&nbsp;
											</Typography>
											<div className={classes!.blockCenter}>
												<Typography color='secondary' variant='h6' gutterBottom={true}>
													&nbsp;
												</Typography>
											</div>
										</CardContent>
									</CardActionArea>
								</Card>
							</Grid>
							<Grid item={true} xs={12} md={6}>
								<Card className={classes!.card}>
									<CardActionArea>
										<CardContent>
											<Typography variant='h6' gutterBottom={true}>
												&nbsp;
											</Typography>
											<div className={classes!.blockCenter}>
												<Typography color='secondary' variant='h6' gutterBottom={true}>
													&nbsp;
												</Typography>
											</div>
										</CardContent>
									</CardActionArea>
								</Card>
							</Grid>
						</Grid>
					</Grid>
				</div>
			</React.Fragment>
		)
	}
}

export const Home = withRouter(withStyles(styles)(HomeBase));
