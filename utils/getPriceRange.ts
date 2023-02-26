export const getPriceRange = (prices: string[]) => {
	let tSort: string[] = [];
	let priceSorted: string[] = [];
	if (prices && prices.length) {
		//Sorted Array over time
		tSort = [...prices].sort((a, b) => +a[0] - +b[0]);
		priceSorted = [...tSort].sort((a, b) => +a[1] - +b[1]);
	}
	return { tSort, priceSorted };
};
