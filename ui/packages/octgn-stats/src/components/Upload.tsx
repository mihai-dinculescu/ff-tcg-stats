import { Grid, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import * as React from 'react';

import { processMatchFiles } from '../apis/processMatchFiles';
import { GamesContext } from '../contexts/GamesContext';
import { parseFilesToMatches } from '../helpers/uploadHelpers';
import { IMatchToUpload } from '../models/MatchToUpload';
import { UploadDropzone } from './UploadDropzone';

const useStyles = makeStyles((theme) => ({
	block: {
		padding: theme.spacing(1),
	},
	grid: {
		margin: `0 ${theme.spacing(1)}px`,
		width: 1200,
		[theme.breakpoints.down('sm')]: {
			width: 'calc(100% - 20px)'
		},
	},
	header: {
		alignItems: 'center',
		display: 'flex',
		justifyContent: 'space-between',
	},
	progressBar: {
		height: 8,
	}
}));

const normaliseProgress = (value: number, max: number) => value * 100 / max;

export const Upload = () => {
	const [, setGames] = React.useContext(GamesContext);
	const [matchesToUpload, setMatchesToUpload] = React.useState<IMatchToUpload[] | null>(null);
	const [completed, setCompleted] = React.useState(0);
	const [maxCompleted, setMaxCompleted] = React.useState(100);

	const classes = useStyles();

	// tslint:disable-next-line:no-empty
	const progress = React.useRef(() => {});

	React.useEffect(
		() => {
			progress.current = () => {
				if (matchesToUpload !== null) {
					let slice: IMatchToUpload[] = [];

					if (matchesToUpload.length > 3) {
						setMatchesToUpload((oldGamesToUpload) => {
							slice = oldGamesToUpload!.slice(0, 3);
							return oldGamesToUpload!.slice(3);
						});
					} else {
						slice = matchesToUpload;
						setMatchesToUpload(null);
					}

					slice.forEach(async (match) => {
						if (match.hasError) {
							return;
						}

						try {
							const newGames = await processMatchFiles(match);

							// this ought to be immutable and possibly defined in the context
							setGames((oldGames) => {
								return {
									games: oldGames.games.concat(newGames)
								};
							});

							setCompleted((oldCompleted) => {
								return oldCompleted + 1;
							});
						} catch {
							// handle error
						}
					});
				}
			};
		},
	);

	React.useEffect(
		() => {
			function tick() {
				progress.current();
			}
			const timer = setInterval(tick, 500);

			return () => {
				clearInterval(timer);
			};
		},
	);

	const uploadFiles = (files: File[]) => {
		const matches = parseFilesToMatches(files);
		const validMatches = matches.filter((m) => !m.hasError);
		setMatchesToUpload(validMatches);
		setCompleted(0);
		setMaxCompleted(validMatches.length);
	};

	return (
		<>
			<Grid spacing={1} alignItems='center' justify='center' container={true} className={classes!.grid}>
				<Grid item={true} xs={12}>
					<div className={classes!.header}>
						<div className={classes!.block}>
							<Typography variant='h6' gutterBottom={true}>OCTGN Stats</Typography>
						</div>
					</div>
				</Grid>
				<Grid item={true} xs={12}>
					<UploadDropzone uploadFiles={uploadFiles} />
					<div>
						<LinearProgress
							className={classes!.progressBar}
							variant='determinate'
							value={normaliseProgress(completed, maxCompleted)}
						/>
					</div>
				</Grid>
			</Grid>
		</>
	);
};
