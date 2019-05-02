import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import withStyles, { StyledComponentProps, StyleRulesCallback } from '@material-ui/core/styles/withStyles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import * as React from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';

import { Menu } from './Menu';

// tslint:disable-next-line:one-variable-per-declaration
const ListItemCustom = ListItem as any;
const TabCustom = Tab as any;

const styles: StyleRulesCallback<string> = (theme) => ({
	appBar: {
		backgroundColor: 'white',
		borderBottom: `1px solid ${theme.palette.grey['100']}`,
		boxShadow: 'none',
		position: 'relative',

	},
	flex: {
		display: 'flex',
		[theme.breakpoints.down('sm')]: {
			alignItems: 'center',
			display: 'flex',
			justifyContent: 'space-evenly',
		}
	},
	iconButton: {
		float: 'right'
	},
	iconContainer: {
		display: 'none',
		[theme.breakpoints.down('sm')]: {
			display: 'block'
		}
	},
	inline: {
		display: 'inline'
	},
	link: {
		color: 'inherit',
		textDecoration: 'none',
	},
	productLogo: {
		borderLeft: `1px solid ${theme.palette.grey.A100}`,
		display: 'inline-block',
		marginLeft: 32,
		paddingLeft: 24,
		[theme.breakpoints.up('md')]: {
			paddingTop: '1.5em'
		}
	},
	tabContainer: {
		marginLeft: 32,
		[theme.breakpoints.down('sm')]: {
			display: 'none'
		}
	},
	tabItem: {
		minWidth: 'auto',
		paddingBottom: 20,
		paddingTop: 20,
	},
	tagline: {
		display: 'inline-block',
		marginLeft: 10,
		[theme.breakpoints.up('md')]: {
			paddingTop: '0.8em'
		}
	},
})

interface ITopbarOwnProps extends RouteComponentProps, StyledComponentProps {
	noTabs?: boolean;
	currentPath: string;
}

class HeaderBase extends React.Component<ITopbarOwnProps, {}> {
	public state = {
		menuDrawer: false,
		value: 0,
	};

	public componentDidMount() {
		window.scrollTo(0, 0);
	}

	public render() {
		const { classes } = this.props;

		return (
			<AppBar position='absolute' color='default' className={classes!.appBar}>
				<Toolbar>
					<Grid container={true} spacing={24} alignItems='baseline'>
						<Grid item={true} xs={12} className={classes!.flex}>
							<div className={classes!.inline}>
								<Typography variant='h6' color='inherit' noWrap={true}>
									<Link to='/' className={classes!.link}>
										<span className={classes!.tagline}>FF TCG Stats</span>
									</Link>
								</Typography>
							</div>
							{!this.props.noTabs && (
								<React.Fragment>
									<div className={classes!.iconContainer}>
										<IconButton onClick={this.mobileMenuOpen} className={classes!.iconButton} color='inherit' aria-label='Menu'>
											<MenuIcon />
										</IconButton>
									</div>
									<div className={classes!.tabContainer}>
										<SwipeableDrawer anchor='right' open={this.state.menuDrawer} onClose={this.mobileMenuClose} onOpen={this.mobileMenuOpen}>
											<AppBar title='Menu' />
											<List>
												{Menu.map((item: any, index: any) => (
													<ListItemCustom component={Link} to={{ pathname: item.pathname, search: this.props.location.search }} button={true} key={item.label}>
														<ListItemText primary={item.label} />
													</ListItemCustom>
												))}
											</List>
										</SwipeableDrawer>
										<Tabs
											value={this.current() || this.state.value}
											indicatorColor='primary'
											textColor='primary'
											onChange={this.handleChange}
										>
											{Menu.map((item, index) => (
												<TabCustom key={index} component={Link} to={{ pathname: item.pathname, search: this.props.location.search }} classes={{ root: classes!.tabItem }} label={item.label} />
											))}
										</Tabs>
									</div>
								</React.Fragment>
							)}
						</Grid>
					</Grid>
				</Toolbar>
			</AppBar>
		)
	}

	private handleChange = (event: any, value: any) => {
		this.setState({ value });
	};

	private mobileMenuOpen = (event: any) => {
		this.setState({ menuDrawer: true });
	}

	private mobileMenuClose = (event: any) => {
		this.setState({ menuDrawer: false });
	}

	private current = () => {
		const { currentPath } = this.props;

		if (currentPath === '/home') {
			return 0;
		}
		if (currentPath === '/dashboard') {
			return 1;
		}

		return null;
	}
}

export const Header = withRouter(withStyles(styles)(HeaderBase));
