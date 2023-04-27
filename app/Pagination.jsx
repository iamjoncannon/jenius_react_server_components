import { useMemo } from 'react';
import styled from 'styled-components';

export const StyledPageWrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;

	button {
		font-size: 0.75rem;
		width: 4rem;
	}

	button:hover {
		color: #64ffaf;
	}
`;

const PaginationWrapper = ({ page, remoteState, nextPage }) => {
	// this works but ideally we would automatically handle this in the server component shell somehow
	const isCurrent = useMemo(
		() => page === remoteState?.pagination?.page,
		[page, remoteState?.pagination?.page]
	);

	return (
		<StyledPageWrapper>
			<button
				className={remoteState?.pagination?.hasPrevPage ? 'opacity-50 cursor-default	' : ''}
				disabled={remoteState?.pagination?.hasPrevPage || !isCurrent}
				onClick={() => nextPage((page) => page - 1)}
			>
				Last Page
			</button>
			<button
				disabled={remoteState?.pagination?.hasNextPage || !isCurrent}
				className={remoteState?.pagination?.hasNextPage ? 'opacity-50 cursor-default	' : ''}
				onClick={() => nextPage((page) => page + 1)}
			>
				Next Page
			</button>
		</StyledPageWrapper>
	);
};

export default PaginationWrapper;
