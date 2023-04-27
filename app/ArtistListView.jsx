// @ts-nocheck
import React from 'react';
import { MIN_SEARCH_LENGTH } from './constants';
import RedirectWrapper from './RedirectWrapper';

const ArtistListCard = ({ artist }) => {
	return (
		<div className="genius-card-song">
			<img src={artist?.imageUrl} />

			<table>
				<tr>
					<td>
						<RedirectWrapper redirectUrl={`/?search=${artist.name}`}>{artist.name}</RedirectWrapper>
					</td>
				</tr>
			</table>
		</div>
	);
};

async function ArtistListView({ search, artistData, source, pagination }) {
	return search?.length > MIN_SEARCH_LENGTH && artistData?.length > 0 ? (
		<div>
			<>
				<h3>
					<i>{`${source} Artist Results ${pagination?.pageStart}-${pagination?.pageEnd} of ${pagination?.totalCount}`}</i>
				</h3>

				<div className="genius-list-container-2 genius-list-container--half">
					{artistData?.slice(0, 10)?.map((artist) => (
						<ArtistListCard key={artist?.id} {...{ artist }} />
					))}
				</div>
			</>
		</div>
	) : (
		<div>
			<>
				<h3>
					<i>{`${source} Artist Results: 0 `}</i>
				</h3>
				<div className="genius-list-container-2 genius-list-container--half"></div>
			</>
		</div>
	);
}

export default ArtistListView;
