import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';

const spyScrollTo = jest.fn();
Object.defineProperty((global as any).window, 'scrollTo', { value: spyScrollTo });

it('renders without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<App />, div);
	ReactDOM.unmountComponentAtNode(div);
});
