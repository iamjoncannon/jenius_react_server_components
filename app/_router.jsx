import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
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
		<ServerComponentShell {...{ serverComponent: 'AppRoot' }} />
	</StrictMode>
);
