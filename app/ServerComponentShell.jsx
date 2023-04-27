'use client';
// @ts-expect-error Module '"react"' has no exported member 'use'.
import { StrictMode, useEffect, useState, use, startTransition } from 'react';
import { createRoot } from 'react-dom/client';
import { /* FOR FRAMEWORK DEVS */ createFromFetch } from 'react-server-dom-webpack/client';
import { ReactIcon } from './components';

const initialCacheJsx = new Map();
const initialCacheRemoteState = new Map();

const ServerComponentShell = ({
	fallback,
	onHydrate,
	showCode,
	serverComponent,
	childProps,
	hydrator
}) => {
	const propsForServer = JSON.stringify({ hydrator, serverComponent, ...childProps });

	const init = {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: propsForServer
	};

	const url = '/rsc';
	const [jsxCache] = useState(initialCacheJsx);
	const [stateCache] = useState(initialCacheRemoteState);
	const [lazyJsx, setLazyJsx] = useState(null);
	const [code, setCode] = useState('');

	useEffect(() => {
		if (!jsxCache.has(propsForServer) && showCode) {
			fetch(url, init).then(async (res) => {
				const reader = res.body?.getReader();
				if (!reader) return;
				let allDone = false;
				const chunks = [];
				while (!allDone) {
					const { value, done } = await reader.read();
					if (done) {
						allDone = true;
					} else {
						const decoded = new TextDecoder().decode(value);
						const segments = decoded.trim().split('\n');
						chunks.push(segments);
					}
				}
				setCode('SERVER COMPONENT: ' + chunks.join().slice(0, 500) + '...');
			});
		}
	}, [childProps]);

	useEffect(() => {
		setLazyJsx(null);
		if (!jsxCache.has(propsForServer)) {
			const apiCall = fetch(url, init);

			apiCall.then((data) => {
				let stateFromHydration = {};
				try {
					stateFromHydration = JSON.parse(
						decodeURIComponent(data.headers.get('stateFromHydration') || '')
					);
				} catch (err) {}

				stateCache.set(propsForServer, stateFromHydration);
				!!onHydrate && onHydrate(stateFromHydration);

				const created = createFromFetch(apiCall);

				jsxCache.set(propsForServer, created);
				setLazyJsx(created);
			});
		} else {
			const jsxCacheHit = jsxCache.get(propsForServer);
			const stateCacheHit = stateCache.get(propsForServer);
			!!onHydrate && onHydrate(stateCacheHit);
			setLazyJsx(jsxCacheHit);
		}
	}, [childProps]);

	return (
		<div>
			{showCode ? (
				<div className="tooltip">
					<ReactIcon />
					<span className="tooltiptext">{code}</span>
				</div>
			) : (
				<></>
			)}

			{lazyJsx !== null ? use(lazyJsx) : fallback}
		</div>
	);
};

export default ServerComponentShell;
