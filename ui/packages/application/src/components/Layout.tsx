import { CssBaseline, makeStyles } from '@material-ui/core';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { Header } from './Header';

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.grey['100'],
		flexGrow: 1,
		overflow: 'hidden',
		paddingBottom: 200,
	},
}));

const LayoutBase = (props: React.PropsWithChildren<RouteComponentProps>) => {
	const currentPath = props.location.pathname;

	const classes = useStyles();

	return (
		<>
			<CssBaseline />
			<Header currentPath={currentPath} />
			<div className={classes!.root}>
				{props.children}
			</div>
		</>
	);
};

const Layout = withRouter(LayoutBase);

export const withLayout = (WrappedComponent: React.ComponentType) => {
	return (
		<Layout>
			<WrappedComponent />
		</Layout>
	);
};
