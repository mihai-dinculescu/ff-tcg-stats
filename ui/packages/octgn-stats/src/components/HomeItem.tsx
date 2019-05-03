import { Card, CardActionArea, CardContent, Grid } from '@material-ui/core';
import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

// tslint:disable-next-line:no-var-requires
const octgnImage = require('../../assets/images/octgn-logo.png');

export class HomeItemBase extends React.Component<RouteComponentProps> {
	private navigateToOctgnStats = () => {
		this.props.history.push('/octgn-stats');
	}

	public render() {
		return (
			<Grid item={true} xs={12} md={6}>
				<Card>
					<CardActionArea onClick={this.navigateToOctgnStats}>
						<CardContent>
							<img src={octgnImage} />
						</CardContent>
					</CardActionArea>
				</Card>
			</Grid>
		);
	}
}

export const HomeItem = withRouter(HomeItemBase);
