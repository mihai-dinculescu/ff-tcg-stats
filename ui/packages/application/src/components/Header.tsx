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
});

interface ITopbarOwnProps extends RouteComponentProps, StyledComponentProps {
	noTabs?: boolean;
	currentPath: string;
}

const getCurrent = (currentPath: string) => {
	if (currentPath === '/home') {
		return 0;
	}
	if (currentPath === '/dashboard') {
		return 1;
	}

	return null;
};

const HeaderBase = (props: ITopbarOwnProps) => {
	const [value, setValue] = React.useState(0);
	const [menuDrawer, setMenuDrawer] = React.useState(false);

	const { classes } = props;

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
						{/* tslint:disable-next-line:jsx-no-multiline-js */}
						{!props.noTabs && (
							<React.Fragment>
								<div className={classes!.iconContainer}>
									<IconButton
										onClick={() => setMenuDrawer(true)}
										className={classes!.iconButton}
										color='inherit'
										aria-label='Menu'
									>
										<MenuIcon />
									</IconButton>
								</div>
								<div className={classes!.tabContainer}>
									<SwipeableDrawer
										anchor='right'
										open={menuDrawer}
										onClose={() => setMenuDrawer(false)}
										onOpen={() => setMenuDrawer(true)}
									>
										<AppBar title='Menu' />
										<List>
											{/* tslint:disable-next-line:jsx-no-multiline-js */}
											{Menu.map((item: any, index: any) => (
												<ListItemCustom
													component={Link}
													to={{ pathname: item.pathname, search: props.location.search }}
													button={true}
													key={item.label}
												>
													<ListItemText primary={item.label} />
												</ListItemCustom>
											))}
										</List>
									</SwipeableDrawer>
									<Tabs
										value={getCurrent(props.currentPath) || value}
										indicatorColor='primary'
										textColor='primary'
										onChange={(event: React.ChangeEvent<any>, newValue: string) => setValue(Number(newValue))}
									>
										{/* tslint:disable-next-line:jsx-no-multiline-js */}
										{Menu.map((item, index) => (
											<TabCustom
												key={index}
												component={Link}
												to={{ pathname: item.pathname, search: props.location.search }}
												classes={{ root: classes!.tabItem }}
												label={item.label}
											/>
										))}
									</Tabs>
								</div>
							</React.Fragment>
						)}
					</Grid>
				</Grid>
			</Toolbar>
		</AppBar>
	);
};

export const Header = withRouter(withStyles(styles)(HeaderBase));
