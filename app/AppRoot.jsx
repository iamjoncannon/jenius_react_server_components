import { Suspense } from 'react';
import MainLayout from './MainLayout';

export default async function ServerRoot() {
	return (
		<>
			<Suspense>
				<MainLayout />
			</Suspense>
		</>
	);
}
