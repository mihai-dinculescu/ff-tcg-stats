import * as React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import { App as OctgnStats } from '@ff-tcg-stats/octgn-stats';

import { Home } from './Home';
import { ScrollToTop } from './ScrollTop';
import { withLayout } from './Layout';

export const Routes = () => (
	<HashRouter>
		<ScrollToTop>
			<Switch>
				<Route exact={true} path='/' component={withLayout(Home)} />
				<Route exact={true} path='/home' component={withLayout(Home)} />
				<Route exact={true} path='/octgn-stats' component={withLayout(OctgnStats)} />
			</Switch>
		</ScrollToTop>
	</HashRouter>
);
