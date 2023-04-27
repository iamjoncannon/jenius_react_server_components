import React from 'react';
// 71k dependency we don't have to ship to the client
import sanitizeHtml from 'sanitize-html';
import RedirectWrapper from './RedirectWrapper';

const ArtistFeatureCard = async ({ artist }) => {
	const sanitizedData = () => ({
		__html: sanitizeHtml(artist?.description || '')
	});

	return (
		<div className="genius-card genius-card-artist animate__animated animate__fadeIn">
			{!!artist && (
				<>
					<div>
						<RedirectWrapper redirectUrl={`?search=${artist?.name}`}>
							<span className="title">{artist?.name}</span>
						</RedirectWrapper>

						{/* </a> */}
						<img src={artist?.headerImageUrl} className="img-hero" />
					</div>
					<div style={{ float: 'right' }}>
						<h4 dangerouslySetInnerHTML={sanitizedData()} />
					</div>
				</>
			)}
			{!!!artist && <div className="genius-card-artist--no-result">No artist result.</div>}
		</div>
	);
};

export default ArtistFeatureCard;
