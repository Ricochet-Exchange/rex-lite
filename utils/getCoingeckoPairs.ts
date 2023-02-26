import { Coin } from 'constants/coins';
import { InvestmentFlow } from 'constants/flowConfig';

export const getCoingeckoPairs = (positions: InvestmentFlow[]) => {
	const pairsMap: Map<string, Coin[]> = new Map();
	if (positions.length) {
		positions.map((position) => pairsMap.set(position.flowKey, [position.coinA, position.coinB]));
	}
	return pairsMap;
};
