import fs from 'node:fs';
import { createElement } from 'react';
import { createRouter } from '@hattip/router';
import * as ReactServerDom from 'react-server-dom-webpack/server.browser';
import { readClientComponentMap, resolveClientDist, resolveServerDist } from './utils.js';
import hydrators from '../app/hydrators.js';

const server = createRouter();

server.post('/rsc', async ({ request }) => {
	const props = await request.json();
	const { serverComponent, hydrator } = props;

	const { hydratorProps, stateFromHydration } =
		hydrator && hydrators[hydrator] ? await hydrators[hydrator](props) : props;

	const serverComponentModule = await import(
		resolveServerDist(
			`${serverComponent}.js${
				process.env.NODE_ENV === 'development' ? `?invalidate=${Date.now()}` : ''
			}`
		).href
	);

	const renderedServerComponent = createElement(serverComponentModule.default, hydratorProps);

	const clientComponentMap = await readClientComponentMap();

	const stream = ReactServerDom.renderToReadableStream(renderedServerComponent, clientComponentMap);
	return new Response(stream, {
		headers: new Headers({
			stateFromHydration: encodeURIComponent(JSON.stringify(stateFromHydration))
		})
	});
});

server.get('/', async () => {
	const html = await fs.promises.readFile(
		new URL('./templates/index.html', import.meta.url),
		'utf-8'
	);
	return new Response(html, {
		headers: { 'Content-type': 'text/html' }
	});
});

server.get('/dist/client/**/*.js', async ({ request }) => {
	const { pathname } = new URL(request.url);
	const filePath = pathname.replace('/dist/client/', '');
	const contents = await fs.promises.readFile(resolveClientDist(filePath), 'utf-8');
	return new Response(contents, {
		headers: {
			'Content-Type': 'application/javascript'
		}
	});
});

export const handler = server.buildHandler();
