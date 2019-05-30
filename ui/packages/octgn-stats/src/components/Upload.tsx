import { Grid, Typography } from '@material-ui/core';
import withStyles, { StyledComponentProps, StyleRulesCallback } from '@material-ui/core/styles/withStyles';
import * as React from 'react';
import Dropzone, { DropzoneRef } from 'react-dropzone';

import { processGameFiles } from '../apis/processGameFiles';
import { parseFilesToGames } from '../helpers/uploadHelpers';
import { IUploadedGame } from '../models/UploadedGame';

const styles: StyleRulesCallback = (theme) => ({
	block: {
		padding: theme.spacing.unit * 2,
	},
	grid: {
		margin: `0 ${theme.spacing.unit * 2}px`,
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
});

const dropzone = {
	alignItems: 'center',
	backgroundColor: '#fafafa',
	borderColor: '#eeeeee',
	borderRadius: 2,
	borderStyle: 'dashed',
	borderWidth: 2,
	color: '#bdbdbd',
	display: 'flex',
	flex: 1,
	flexDirection: 'column' as any,
	outline: 'none',
	padding: '20px',
	transition: 'border .24s ease-in-out',
};

const dropzoneAccept = {
	borderColor: '#00e676',
};

const dropzoneActive = {
	borderColor: '#2196f3',
};

const dropzoneReject = {
	borderColor: '#ff1744',
};

const UploadBase = (props: StyledComponentProps) => {
	const [games, setGames] = React.useState<IUploadedGame[] | null>(null);
	const { classes } = props;

	const uploadFiles = (files: File[]) => {
		const newGames = parseFilesToGames(files);
		setGames(newGames);

		newGames.forEach((game) => {
			if (game.hasError) {
				return;
			}

			console.log('uploading ', game.name);

			const o8h = files.find((f) => f.name === `${game.name}.o8h`);
			const o8l = files.find((f) => f.name === `${game.name}.o8l`);

			processGameFiles(o8h!, o8l!).then((response: any) => {
				console.log(response.data.games);
			});
		});
	};

	const dropzoneRef = React.createRef<DropzoneRef>();

	return (
		<>
			<Grid spacing={24} alignItems='center' justify='center' container={true} className={classes!.grid}>
				<Grid item={true} xs={12}>
					<div className={classes!.header}>
						<div className={classes!.block}>
							<Typography variant='h6' gutterBottom={true}>OCTGN Stats</Typography>
						</div>
					</div>
				</Grid>
				<Grid item={true} xs={12}>
					<Dropzone ref={dropzoneRef} onDropAccepted={uploadFiles}>
						{({getRootProps, getInputProps, isDragAccept, isDragActive, isDragReject, isFocused}) => {
							const style = React.useMemo(
								() => ({
									...(dropzone),
									...(isDragAccept ? dropzoneAccept : {}),
									...(isDragActive || isFocused ? dropzoneActive : {}),
									...(isDragReject ? dropzoneReject : {}),
								}),
								[
									isDragAccept,
									isDragActive,
									isDragReject,
									isFocused,
								]
							);

							return (
								<div {...getRootProps({style})}>
									<input {...getInputProps()} />
									<ul>
										<li>
											<p>Hit <strong>Upload</strong>.</p>
										</li>
										<li>
											<p>
												Navigate to your OCTGN History folder (e.g. <strong>C:\Users\my_user\Documents\OCTGN\History</strong>).
											</p>
										</li>
										<li>
											<p>
												Select the games you want to upload.
												<br/>
												<strong>Note:</strong> For a game to succesfully upload you need both the
												<strong>.o8h</strong> and <strong>.o8l</strong> files.
											</p>
										</li>
									</ul>
									<p>Drag 'n' drop some files here, or click to select files</p>
								</div>
							);
						}}
					</Dropzone>
				</Grid>
				{games !== null ? games.length : ''}
			</Grid>
		</>
	);
};

export const Upload = withStyles(styles)(UploadBase);
