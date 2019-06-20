import { getExtension, parseFilesToMatches } from './uploadHelpers';

describe('parseFilesToMatches', () => {
	it('parses File array', () => {
		const fileListMock = [];
		fileListMock[0] = { name: 'match 1.o8h' };
		fileListMock[1] = { name: 'match 1.o8l' };
		fileListMock[2] = { name: 'match 2.o8hx' };
		fileListMock[3] = { name: 'match 2.o8l' };
		fileListMock[4] = { name: 'match 3.o8h' };
		fileListMock[5] = { name: 'match 3.o8lx' };
		fileListMock[6] = { name: 'match 4.o8h' };
		fileListMock[7] = { name: 'match 5.o8l' };

		const result = parseFilesToMatches(fileListMock as unknown as File[]);

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
