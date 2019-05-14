import { IUploadedGame } from '../models/UploadedGame';

const getExtension = (fileName: string) => {
	return fileName.slice((Math.max(0, fileName.lastIndexOf('.')) || Infinity) + 1);
};

export const parseFilesToGames = (files: FileList | null) => {
	const games: IUploadedGame[] = [];

	if (files !== null) {
		const filesArray = Array.from(files);

		filesArray.forEach((file) => {
			const ext = getExtension(file.name);

			if (ext !== '') {
				const fileName = file.name.replace('.' + ext, '');

				if (fileName !== '') {
					const game = games.find((g) => g.name === fileName);

					if (!game) {
						games.push({ name: fileName, hasError: true });
					}
				}
			}
		});

		games.forEach((game) => {
			const o8h = filesArray.find((file) => file.name === game.name + '.o8h');
			const o8l = filesArray.find((file) => file.name === game.name + '.o8l');

			game.hasError = (o8h === undefined || o8l === undefined);

			if (game.hasError) {
				game.errorMessage = o8h === undefined ? 'o8h file is missing.' : 'o8l file is missing.';
			}
		});
	}

	return games;
};
