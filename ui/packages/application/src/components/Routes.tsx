import * as React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import { App as OctgnStats } from '@ff-tcg-stats/octgn-stats';

import { Home } from './Home';
import { ScrollToTop } from './ScrollTop';

export const Routes = () => {
	return (
		<HashRouter>
			<ScrollToTop>
				<Switch>
					<Route exact={true} path='/' component={Home} />
					<Route exact={true} path='/home' component={Home} />
					<Route exact={true} path='/octgn-stats' component={OctgnStats} />
				</Switch>
			</ScrollToTop>
		</HashRouter>
	);
};
