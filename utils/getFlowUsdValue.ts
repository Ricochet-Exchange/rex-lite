import { InvestmentFlow } from 'constants/flowConfig';

export const getFlowUSDValue = (
	flow: InvestmentFlow,
	queries: Map<
		string,
		{
			flowKey: string;
			flowsReceived: number;
			flowsOwned: string;
			totalFlows: number;
			placeholder: string;
			subsidyRate: { perso: number; total: number; endDate: string };
			streamedSoFar?: number;
			receivedSoFar?: number;
		}
	>,
	coingeckoPrices: Map<string, number>,
	toFixed: number = 0
) => {
	return (
		coingeckoPrices.size > 0 && queries.size > 0
			? parseFloat(queries.get(flow.flowKey)?.flowsOwned!) * coingeckoPrices.get(flow.tokenA)!
			: 0
	).toFixed(toFixed);
};

export const getPersonalFlowUSDValue = (flow: string, coingeckoPrice: number, toFixed: number = 0) => {
	return (parseFloat(flow as string) * coingeckoPrice).toFixed(toFixed);
};
