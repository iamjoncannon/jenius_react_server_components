import { PrismaClient } from '@prisma/client';
import { MIN_SEARCH_LENGTH } from './constants.js';
const prisma = new PrismaClient();

const getHasNextPage = (page, totalCount) => {
	return (page + 1) * 10 > totalCount - 1;
};

const getPagination = (page, totalCount) => {
	return {
		page,
		totalCount,
		hasNextPage: getHasNextPage(page, totalCount),
		hasPrevPage: page < 1,
		pageStart: page * 10 + 1,
		pageEnd: Math.min((page + 1) * 10, totalCount)
	};
};

const ArtistFeatureCardOneResult = async ({ search }) => {
	let artistData = [];
	if (search?.length > MIN_SEARCH_LENGTH) {
		// @ts-ignore
		const exactMatch = await prisma.artist.findMany({
			where: {
				name: {
					equals: String(search)
				}
			}
		});

		artistData = exactMatch;

		if (exactMatch.length === 0) {
			// @ts-ignore
			artistData = await prisma.artist.findMany({
				where: {
					name: {
						contains: String(search)
					}
				}
			});

			artistData.sort((a, b) => b.description.length - a.description.length);
		}
	}

	return {
		hydratorProps: {
			artist: artistData[0]
		},
		stateFromHydration: { length: artistData.length }
	};
};

const getFallback = async () =>
	await prisma.artist.findFirst({
		where: {
			name: {
				equals: 'Jimi Hendrix'
			}
		}
	});

const ArtistFeatureCardForSplashPage = async () => {
	const id = Math.floor(Math.random() * 1000);

	const result =
		await prisma.$queryRaw`SELECT * FROM Artist WHERE LENGTH(description) > 500 LIMIT 1000 OFFSET ${id}`;

	return {
		hydratorProps: {
			// @ts-ignore
			artist: result[0] || (await getFallback())
		}
	};
};

const SongsListView = async ({ search, page }) => {
	let songData = [];
	let totalCount = 0;
	if (search?.length > MIN_SEARCH_LENGTH) {
		totalCount = await prisma.song.count({
			where: {
				searchIndex: {
					contains: String(search)
				}
			}
		});

		songData = await prisma.song.findMany({
			skip: page * 10,
			take: 10,
			where: {
				searchIndex: {
					contains: String(search)
				}
			}
		});
	}

	return {
		hydratorProps: {
			search,
			songData,
			pagination: getPagination(page, totalCount)
		},
		stateFromHydration: { pagination: getPagination(page, totalCount) }
	};
};

const ArtistListView = async ({ search, source, page }) => {
	let artistData = [];
	let totalCount = 0;
	if (search?.length > MIN_SEARCH_LENGTH) {
		totalCount = await prisma.artist.count({
			where: {
				name: {
					contains: String(search)
				},
				source: {
					equals: String(source)
				}
			}
		});

		artistData = await prisma.artist.findMany({
			skip: page * 10,
			take: 10,
			where: {
				name: {
					contains: String(search)
				},
				source: {
					equals: String(source)
				}
			}
		});
	}

	return {
		hydratorProps: {
			search,
			source,
			artistData,
			pagination: getPagination(page, totalCount)
		},
		stateFromHydration: { pagination: getPagination(page, totalCount) }
	};
};

const hydrators = {
	SongsListView,
	ArtistListView,
	ArtistFeatureCardForSplashPage,
	ArtistFeatureCardOneResult
};

export default hydrators;
