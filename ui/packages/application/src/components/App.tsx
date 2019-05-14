import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { blue, indigo } from '@material-ui/core/colors';
import * as React from 'react';

import '../styles/App.scss';

import { Routes } from './Routes';

const theme = createMuiTheme({
	palette: {
		primary: {
			main: indigo[700]
		},
		secondary: {
			main: blue[900]
		},
	},
	typography: {
		// Use the system font instead of the default Roboto font.
		fontFamily: [
			'"Lato"',
			'sans-serif'
		].join(','),
		useNextVariants: true,
	}
});

export const App = () => (
	<MuiThemeProvider theme={theme}>
		<Routes />
	</MuiThemeProvider>
);
