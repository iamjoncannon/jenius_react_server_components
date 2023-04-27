'use client';

import { useCallback } from 'react';

const RedirectWrapper = ({ children, redirectUrl }) => {
	const redirect = useCallback(
		() => window.history.replaceState({}, '', redirectUrl),
		[redirectUrl]
	);

	return (
		<button onClick={redirect}>
			<a>{children} </a>
		</button>
	);
};

export default RedirectWrapper;
