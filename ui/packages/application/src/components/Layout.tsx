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

interface IHomeOwnProps extends RouteComponentProps, StyledComponentProps { }

class LayoutBase extends React.Component<IHomeOwnProps> {
	public render() {
		const { classes } = this.props;
		const currentPath = this.props.location.pathname;

		return (
			<>
				<CssBaseline />
				<Header currentPath={currentPath} />
				<div className={classes!.root}>
					{this.props.children}
				</div>
			</>
		);
	}
}

export const Layout = withRouter(withStyles(styles)(LayoutBase));

export const withLayout = (WrappedComponent: React.ComponentType) => {
	// tslint:disable-next-line:max-classes-per-file
	return class extends React.Component {
		public render() {
			return (
				<Layout>
					<WrappedComponent />
				</Layout>
			);
		}
	};
};
