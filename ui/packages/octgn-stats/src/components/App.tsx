import { Grid } from '@material-ui/core';
import withStyles, { StyledComponentProps, StyleRulesCallback } from '@material-ui/core/styles/withStyles';
import * as React from 'react';

import { Upload } from './Upload';

const styles: StyleRulesCallback = (theme) => ({ });

const AppBase = (props: StyledComponentProps) => (
	<>
		<Grid container={true} justify='center'>
			<Upload />
		</Grid>
	</>
);

export const App = withStyles(styles)(AppBase);
