import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

const coingeckoApi = createApi({
	keepUnusedDataFor: 60, // 60 seconds (default)
	reducerPath: 'coingecko',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://api.coingecko.com/api/v3/',
	}),
	endpoints: (builder) => ({
		getPrices: builder.query<any | null, string>({
			query: (ids: string) => `coins/markets?vs_currency=USD&ids=${ids}`,
		}),
		getUpgradedTokensList: builder.query<any | null, string>({
			query: () =>
				`simple/price?ids=richochet%2Cusd-coin%2Cdai%2Coptimism%2Cethereum%2Cwrapped-bitcoin%2Cidle%2Cmatic-network%2Csushi&vs_currencies=usd`,
		}),
		getTokenHistory: builder.query<any | null, string>({
			query: (tokenId: string) => `coins/${tokenId}/market_chart?vs_currency=usd&days=30&interval=daily`,
		}),
		getTokenPrice: builder.query<any | null, string>({
			query: (tokenId) => `simple/price?ids=${tokenId}&vs_currencies=usd`,
		}),
	}),
});

export default coingeckoApi;
