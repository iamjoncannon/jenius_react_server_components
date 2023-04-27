import React from 'react';
import { MIN_SEARCH_LENGTH } from './constants';
import RedirectWrapper from './RedirectWrapper';

const SongCard = ({ song }) => {
	return (
		<div className="genius-card-song">
			<img src={song?.song_art_image_thumbnail_url} />

			<table>
				<tr>
					<td>{song.title}</td>
				</tr>
				<tr>
					<td>
						<RedirectWrapper redirectUrl={`/?search=${song.artist_names}`}>
							{song.artist_names}
						</RedirectWrapper>
					</td>
				</tr>
				<tr>
					<td>
						<RedirectWrapper redirectUrl={`/?search=${song.albumName}`}>
							{song.albumName}
						</RedirectWrapper>
					</td>
				</tr>
				<tr>
					<td>{song.release_date}</td>
				</tr>
			</table>
		</div>
	);
};

async function SongsListView({ search, songData, pagination }) {
	return search?.length > MIN_SEARCH_LENGTH && songData?.length > 0 ? (
		<div>
			<>
				<h3>
					<i>{`Genius Song Results ${pagination?.pageStart}-${pagination?.pageEnd} of ${pagination?.totalCount}`}</i>
				</h3>

				<div className="genius-list-container-2">
					{songData?.slice(0, 10)?.map((song) => (
						<SongCard key={song?.id} {...{ song }} />
					))}
				</div>
			</>
		</div>
	) : (
		<div>
			<>
				<h3>
					<i>{`Genius Song Results: 0`}</i>
				</h3>
				<div className="genius-list-container--full"></div>
			</>
		</div>
	);
}

export default SongsListView;
