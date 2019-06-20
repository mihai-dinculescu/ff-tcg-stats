import { IMatchToUpload } from '../models/MatchToUpload';

export const getExtension = (fileName: string) => {
	return fileName.slice((Math.max(0, fileName.lastIndexOf('.')) || Infinity) + 1);
};

export const parseFilesToMatches = (files: File[]) => {
	const matches: IMatchToUpload[] = [];

	files.forEach((file) => {
		const ext = getExtension(file.name);

		if (ext !== '') {
			const fileName = file.name.replace('.' + ext, '');

			if (fileName !== '') {
				const match = matches.find((m) => m.name === fileName);

				if (!match) {
					matches.push({ name: fileName, hasError: true });
				}
			}
		}
	});

	matches.forEach((match) => {
		match.o8h = files.find((file) => file.name === match.name + '.o8h');
		match.o8l = files.find((file) => file.name === match.name + '.o8l');

		match.hasError = (match.o8h === undefined || match.o8l === undefined);

		if (match.hasError) {
			match.errorMessage = match.o8h === undefined ? 'o8h file is missing.' : 'o8l file is missing.';
		}
	});

	return matches;
};
