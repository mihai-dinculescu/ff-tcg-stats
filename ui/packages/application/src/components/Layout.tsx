import { CssBaseline } from '@material-ui/core';
import withStyles, { StyledComponentProps, StyleRulesCallback } from '@material-ui/core/styles/withStyles';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { Header } from './Header';

const styles: StyleRulesCallback = (theme) => ({
	root: {
		backgroundColor: theme.palette.grey['100'],
		flexGrow: 1,
		overflow: 'hidden',
		paddingBottom: 200,
	},
});

interface ILayoutProps extends RouteComponentProps, StyledComponentProps { }

const LayoutBase = (props: React.PropsWithChildren<ILayoutProps>) => {
	const { classes } = props;
	const currentPath = props.location.pathname;

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

export const Layout = withRouter(withStyles(styles)(LayoutBase));

export const withLayout = (WrappedComponent: React.ComponentType) => {
	return (
		<Layout>
			<WrappedComponent />
		</Layout>
	);
};
