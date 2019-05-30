import axios from 'axios';

const apiUrl = `${location.protocol}//api.${location.hostname}:${location.port}`;

export const processGameFiles = (o8h: File, o8l: File) => {
	const formData = new FormData();
	formData.append('file_o8h', o8h, o8h.name);
	formData.append('file_o8l', o8l, o8l.name);

	return axios.post(
		`${apiUrl}/process-game-files`,
		formData,
		{
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		},
	);
};
