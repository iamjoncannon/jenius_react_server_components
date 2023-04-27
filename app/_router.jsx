// @ts-expect-error Module '"react"' has no exported member 'use'.
import { StrictMode, useEffect, useState, use, startTransition } from 'react';
import { createRoot } from 'react-dom/client';
import { /* FOR FRAMEWORK DEVS */ createFromFetch } from 'react-server-dom-webpack/client';
import ServerComponentShell from './ServerComponentShell';

/** Dev-only dependencies */
// import './utils/dev/live-reload.js';

// HACK: map webpack resolution to native ESM
// @ts-expect-error Property '__webpack_require__' does not exist on type 'Window & typeof globalThis'.
window.__webpack_require__ = async (id) => {
	return import(id);
};

// @ts-expect-error
const root = createRoot(document.getElementById('root'));
root.render(
	<StrictMode>
		<Router />
	</StrictMode>
);

function Router() {
	return (
		<>
			<ServerComponentShell {...{ serverComponent: 'AppRoot' }} />
		</>
	);
}
