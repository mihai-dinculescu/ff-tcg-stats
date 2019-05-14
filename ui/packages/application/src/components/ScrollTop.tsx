import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

const ScrollToTopBase = (props: React.PropsWithChildren<RouteComponentProps>) => {
	React.useEffect(
		() => {
			window.scrollTo(0, 0);
		},
		[
			props.location.pathname,
		],
	);

	return (
		<>
			{props.children}
		</>
	);
};

export const ScrollToTop = withRouter(ScrollToTopBase);
