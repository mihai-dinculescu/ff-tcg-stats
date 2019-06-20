import * as React from 'react';
import Dropzone, { DropEvent } from 'react-dropzone';

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
	padding: '10px',
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

interface IUploadDropdownOwnProps {
	uploadFiles: (files: File[], event: DropEvent) => void;
}

export const UploadDropzone = (props: IUploadDropdownOwnProps) => {
	return (
		<Dropzone onDropAccepted={props.uploadFiles}>
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
						<p>
							Drag 'n' drop some files here, or click to select files
						</p>
						<p>
							Navigate to your OCTGN History folder
							(e.g. <strong>C:\Users\my_user\Documents\OCTGN\History</strong>).
						</p>
						<p>
							Select the matches you want to upload.
						</p>
						<p>
							<strong>Note:</strong> For a match to succesfully upload you need both the
							<strong>.o8h</strong> and <strong>.o8l</strong> files.
						</p>
					</div>
				);
			}}
		</Dropzone>
	);
};
