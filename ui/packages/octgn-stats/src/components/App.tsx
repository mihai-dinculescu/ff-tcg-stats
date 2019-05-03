import { Grid } from '@material-ui/core';
import withStyles, { StyledComponentProps, StyleRulesCallback } from '@material-ui/core/styles/withStyles';
import * as React from 'react';

const styles: StyleRulesCallback = (theme) => ({ });

class AppBase extends React.Component<StyledComponentProps> {
	public render() {
		return (
			<>
				<Grid container={true} justify='center'>
					OCTGN Stats
				</Grid>
			</>
		);
	}
}

export const App = withStyles(styles)(AppBase);
