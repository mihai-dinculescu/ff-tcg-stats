import { Button, Card, CardActionArea, CardContent, CssBaseline, Grid, SvgIcon, Typography } from '@material-ui/core';
import withStyles, { StyledComponentProps, StyleRulesCallback } from '@material-ui/core/styles/withStyles';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { Header } from '@ff-tcg-stats/header';

const styles: StyleRulesCallback = (theme) => ({
	block: {
		padding: theme.spacing.unit * 2,
	},
	header: {
		alignItems: 'center',
		display: 'flex',
		justifyContent: 'space-between',
	},
	outlinedButton: {
		margin: theme.spacing.unit,
		textTransform: 'none',
	},
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
	private navigateToOctgnStats = () => {
		this.props.history.push('/octgn-stats');
	}

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
							<Grid item={true} xs={12}>
								<div className={classes!.header}>
									<div className={classes!.block}>
										<Typography variant='h6' gutterBottom={true}>FF TCG Stats</Typography>
										<Typography variant='body1'>
											Final Fantasy Trading Card Game Statistics
										</Typography>
									</div>
									<div>
										<Button variant='outlined' className={classes!.outlinedButton} href="https://github.com/mihai-dinculescu/ff-tcg-stats" target="_bank">
											<SvgIcon>
												<path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2 0 1.9 1.2 1.9 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6 0-3.2 0 0 1-.3 3.4 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8 0 3.2.9.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1 .9 2.2v3.3c0 .3.1.7.8.6A12 12 0 0 0 12 .3" />
											</SvgIcon>
											&nbsp;GitHub
										</Button>
									</div>
								</div>
							</Grid>
						</Grid>
					</Grid>
					<Grid container={true} justify='center'>
						<Grid spacing={24} alignItems='center' justify='center' container={true} className={classes!.grid}>
							<Grid item={true} xs={12} md={6}>
								<Card className={classes!.card} onClick={this.navigateToOctgnStats}>
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
