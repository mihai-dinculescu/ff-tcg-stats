import * as React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import { App as OctgnStats } from '@ff-tcg-stats/octgn-stats';

import { Home } from './Home';
import { withLayout } from './Layout';
import { ScrollToTop } from './ScrollTop';

export const Routes = () => (
	<HashRouter>
		<ScrollToTop>
			<Switch>
				<Route exact={true} path='/'>
					{withLayout(Home)}
				</Route>
				<Route exact={true} path='/home'>
					{withLayout(Home)}
				</Route>
				<Route exact={true} path='/octgn-stats'>
					{withLayout(OctgnStats)}
				</Route>
			</Switch>
		</ScrollToTop>
	</HashRouter>
);
