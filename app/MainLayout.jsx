'use client';
// @ts-nocheck
import React, { Suspense } from 'react';
import { CodeIcon, MagnifyingGlass } from './components';
import ServerComponentShell from './ServerComponentShell';
import { StyledContainer } from './styleSheet';

import { MIN_SEARCH_LENGTH, hydratorConstants } from './constants';
import { getSearchParam } from './location.util';
import ArtistFeatureCardLoading from './ArtistFeatureCardLoading';
import ArtistListViewStateContainer from './ArtistListViewStateContainer';
import SongsListViewStateContainer from './SongsListViewStateContainer';

const MainLayout = () => {
	const [search, setSearch] = React.useState('');
	const [typed, setTyped] = React.useState('');
	const inputRef = React.useRef(null);

	const onLogoClick = React.useCallback(() => {
		setSearch('');
		if (inputRef?.current?.value) {
			inputRef.current.value = '';
		}
		window.history.pushState({}, '', '/');
	}, []);

	const onType = React.useCallback((e) => {
		setTyped(e.target.value);
	}, []);

	const onKeyDown = (e) => {
		if (e.keyCode === 13) {
			setSearch(e.target.value);
			window.history.pushState({}, '', `/?search=${e.target.value}`);
		}
	};

	const initialSearchParam = React.useMemo(() => {
		return decodeURIComponent(window.location.search.replace('?search=', ''));
	}, []);

	const isTyping = React.useMemo(() => {
		return typed !== initialSearchParam;
	}, [typed, initialSearchParam]);

	const setSearchFromNavCb = React.useCallback(() => {
		setSearch(getSearchParam());
		setTyped(getSearchParam());
	}, [search]);

	React.useEffect(() => {
		if (initialSearchParam !== '') {
			setSearch(initialSearchParam);
			setTyped(initialSearchParam);
		}
		window?.addEventListener('keydown', onKeyDown);
		window.addEventListener('click', setSearchFromNavCb);
		window.addEventListener('pushstate', setSearchFromNavCb);
		window.addEventListener('popstate', setSearchFromNavCb);
	}, []);

	return (
		<StyledContainer>
			<header>
				<i>
					<h1 className="jenius-logo" onClick={onLogoClick}>
						Jenius
					</h1>
				</i>
				<input ref={inputRef} placeholder="Search Jenius" value={typed} onChange={onType}></input>
				<div className={isTyping ? '' : 'opacity-30'}>
					<MagnifyingGlass />
				</div>
				<div className="code-link">
					<a
						href="https://github.com/iamjoncannon/jenius_react_server_components"
						target="_blank"
						rel="noreferrer"
					>
						<CodeIcon />
					</a>
				</div>
			</header>
			<main>
				{search?.length <= MIN_SEARCH_LENGTH && (
					<ServerComponentShell
						serverComponent={hydratorConstants.ArtistFeatureCard}
						fallback={<ArtistFeatureCardLoading />}
						hydrator={hydratorConstants.ArtistFeatureCardForSplashPage}
					/>
				)}

				{search?.length > MIN_SEARCH_LENGTH && (
					<>
						<div className="grid-section-artist">
							<ServerComponentShell
								serverComponent={hydratorConstants.ArtistFeatureCard}
								hydrator={hydratorConstants.ArtistFeatureCardOneResult}
								fallback={<ArtistFeatureCardLoading />}
								childProps={{ search }}
							/>
						</div>
						<div className="grid-section-list grid-section-list--artist">
							<ArtistListViewStateContainer {...{ search, source: 'genius' }} />
							<ArtistListViewStateContainer {...{ search, source: 'discogs' }} />
						</div>{' '}
						<div className="grid-section-list grid-section-list--song">
							<SongsListViewStateContainer {...{ search }} />
						</div>
					</>
				)}
			</main>
		</StyledContainer>
	);
};

export default MainLayout;
