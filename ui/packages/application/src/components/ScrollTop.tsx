import { Component } from 'react';
import { RouteComponentProps, RouteProps, withRouter } from 'react-router-dom';

class ScrollToTopBase extends Component<RouteComponentProps> {
	public componentDidUpdate(prevProps: RouteProps) {
		if (this.props.location!.pathname !== prevProps.location!.pathname) {
			window.scrollTo(0, 0);
		}
	}

	public render() {
		return this.props.children;
	}
}

export const ScrollToTop = withRouter(ScrollToTopBase);
