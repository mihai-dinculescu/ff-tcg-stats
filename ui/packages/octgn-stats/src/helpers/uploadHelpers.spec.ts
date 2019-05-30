import { getExtension, parseFilesToGames } from './uploadHelpers';

describe('parseFilesToGames', () => {
	it('parses File array', () => {
		const fileListMock = [];
		fileListMock[0] = { name: 'game 1.o8h' };
		fileListMock[1] = { name: 'game 1.o8l' };
		fileListMock[2] = { name: 'game 2.o8hx' };
		fileListMock[3] = { name: 'game 2.o8l' };
		fileListMock[4] = { name: 'game 3.o8h' };
		fileListMock[5] = { name: 'game 3.o8lx' };
		fileListMock[6] = { name: 'game 4.o8h' };
		fileListMock[7] = { name: 'game 5.o8l' };

		const result = parseFilesToGames(fileListMock as unknown as File[]);

		expect(result.length).toEqual(5);
		expect(result[0].hasError).toEqual(false);
		expect(result[1].hasError).toEqual(true);
		expect(result[2].hasError).toEqual(true);
		expect(result[3].hasError).toEqual(true);
		expect(result[4].hasError).toEqual(true);
	});
});

describe('getExtension', () => {
	it('parses empty file name', () => {
		expect(getExtension('')).toEqual('');
	});

	it('parses file name with no extension', () => {
		expect(getExtension('name')).toEqual('');
	});

	it('parses file name with no name', () => {
		expect(getExtension('.htpasswd')).toEqual('');
	});

	it('parses file name with namy dots', () => {
		expect(getExtension('name.with.many.dots.ext')).toEqual('ext');
	});

	it('parses regular file name', () => {
		expect(getExtension('name.ext')).toEqual('ext');
	});
});
