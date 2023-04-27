export const getSearchParam = () =>
	decodeURIComponent(window.location.search.replace('?search=', ''));
