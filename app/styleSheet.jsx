import styled from 'styled-components';

/*
    defining styles in parent to prevent
    duplicating in server rendered code
*/

const breakPointLarge = '1300px';
const breakPointMedium = '1000px';

export const StyledContainer = styled.div`
	min-height: 100vh;
	background-color: #202124;

	display: flex;
	flex-direction: column;
	align-items: center;

	.magnifying-glass {
		height: 1.5rem;
		position: relative;
		right: 2.5rem;

		@media (max-width: 400px) {
			display: none;
		}
	}

	h1 {
		cursor: pointer;
		font-size: 2rem;
	}

	.jenius-logo {
		margin-left: 2rem;
	}

	input {
		width: 25rem;
		padding-left: 1rem;
		margin-left: 4rem;
		height: 2.5rem;
		border-radius: 1rem;

		&:hover,
		&:focus {
			outline: #64ffaf;
		}

		@media (max-width: 400px) {
			width: 9rem;
		}
	}

	header {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		background-color: #fffc64;
		height: 3.5rem;
		padding: 0.5rem;
		position: sticky;
		top: 0;
		z-index: 1;
		width: 100%;
	}

	main {
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		justify-content: space-evenly;

		max-width: 1300px;
	}

	.genius-card-container {
		margin: 2rem;
		min-width: 25vw;
		max-width: 50vw;
		background-color: #64ffaf;
		padding: 1rem;
		border-radius: 2rem;

		text-transform: capitalize;

		@media (max-width: ${breakPointMedium}) {
			max-width: 30rem;
		}
	}

	.genius-card-container-2 {
		height: 75vh;
		overflow-y: scroll;
		margin-top: 0.5rem;
	}

	.genius-card {
		background-color: #fffc64;
		padding: 1rem;
		margin: 1rem;
		display: flex;
		justify-content: space-around;
		border-radius: 2rem;
		overflow-x: hidden;
		max-width: 50rem;

		> div {
			width: 17rem;
			margin-bottom: 1rem;
		}
	}

	.genius-card-artist-loading-container {
		width: 40rem;
		display: flex;
		justify-content: center;
	}

	.genius-card-artist--loading {
		opacity: 0.1;
		min-width: 15rem;
		text-align: center;
	}

	.genius-card-artist--no-result {
		min-width: 15rem;
		text-align: center;
	}

	.genius-card-artist {
		flex-direction: column;
		margin-top: 2rem;

		.title {
			font-weight: 800;
			font-size: 2rem;
			margin: auto;
		}

		img {
			max-height: 10rem;
			width: fit-content;
		}

		.img-hero {
			max-height: 20rem;
			width: fit-content;
			margin: auto;
		}

		> div {
			width: 100%;
		}

		p {
			margin-bottom: 0.5rem;
		}

		iframe {
			max-width: 100%;
		}
	}

	/* grid */

	.grid-section-artist {
		min-height: calc(100vh - 3.5rem);
		flex: 2;
		display: flex;
		justify-content: center;
		align-items: flex-start;
	}

	.grid-section-list {
		height: calc(100vh - 3.5rem);
		flex: 1;
		min-width: 20rem;
		max-width: 20rem;
	}

	.grid-section-list--artist {
		@media (max-width: 700px) {
			display: none;
		}
	}

	.grid-section-list--song {
		@media (max-width: 1000px) {
			display: none;
		}
	}

	/* list containers */

	.genius-list-container {
		background-color: #fffc64;
		margin-top: 2rem;
		margin-right: 2rem;
		padding: 0.25rem;
		border-radius: 0.5rem;

		h3 {
			font-size: 0.75rem !important;
		}
	}

	.genius-list-container-2 {
		max-height: calc(100vh - 10rem);
		min-height: 38vh;
		overflow-y: scroll;
		margin-top: 0.5rem;
	}

	.genius-list-container--half {
		max-height: 38vh;
	}

	.genius-list-container--full {
		min-height: calc(100vh - 10rem);
		max-height: calc(100vh - 10rem);
	}

	/* song */

	.genius-card-song {
		display: flex;
		background-color: #fffc64;
		border-bottom: 1px solid black;
		padding: 0.25rem 0.5rem 0.25rem 0.5rem;

		img {
			height: 5rem;
			min-width: fit-content;
			margin-right: 1rem;
			padding-top: 0.25rem;
		}

		table {
			border-collapse: collapse;
			width: 100%;
			max-width: 80rem;

			tr:first-child {
				td {
					font-size: 0.8rem;
					font-weight: bold;
				}
			}
		}

		th,
		td {
			padding-bottom: 2px;
			button {
				text-align: left;
			}
			font-size: 0.7rem;
		}
	}

	.tooltip {
		position: relative;
		svg {
			position: absolute;
			height: 1rem;
			width: 1rem;
			right: 0;
		}
	}

	.tooltip .tooltiptext {
		display: none;
		width: 20rem;
		overflow-x: hidden;
		background-color: black;
		color: #fff;
		text-align: center;
		padding: 5px 0;
		border-radius: 6px;
		position: absolute;
		right: 0;
	}

	.tooltip:hover .tooltiptext {
		display: unset;
		opacity: 0.75;
		color: #64ffaf;
	}

	.code-link {
		position: absolute;
		right: 0;
		margin-right: 2rem;
		cursor: pointer;

		@media (max-width: 1000px) {
			display: none;
		}
	}
`;
