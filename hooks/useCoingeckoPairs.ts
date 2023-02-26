import { getCoingeckoPairs } from '@richochet/utils/getCoingeckoPairs';
import { Coin } from 'constants/coins';
import { InvestmentFlow } from 'constants/flowConfig';
import { useEffect, useRef, useState } from 'react';

export const useCoingeckoPairs = (positions: InvestmentFlow[]) => {
	const [coingeckoPairs, setCoingeckoPairs] = useState<Map<string, Coin[]>>(new Map());
	const dataLoaded = useRef(false);
	useEffect(() => {
		if (positions.length && !dataLoaded.current) {
			const pairs = getCoingeckoPairs(positions);
			setCoingeckoPairs(pairs);
			dataLoaded.current = true;
		}
	}, [positions]);

	useEffect(() => {
		if (dataLoaded.current) {
			dataLoaded.current = false;
		}
	}, []);

	return coingeckoPairs;
};
