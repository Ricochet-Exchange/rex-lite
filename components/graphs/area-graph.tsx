import { geckoMapping } from 'constants/coingeckoMapping';
import { Coin } from 'constants/coins';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import coingeckoApi from 'redux/slices/coingecko.slice';

interface ChartData {
	name: string;
	price: string;
	amt: string;
}

interface Props {
	from: Coin;
	to: Coin;
}

const labels = ['1 Month', '3 Weeks', '2 Weeks', '1 Week', 'Now'];

// Get coingecko token history
export const AreaGraph: NextPage<Props> = ({ from, to }) => {
	const [coingeckoHistoryTrigger] = coingeckoApi.useLazyGetTokenHistoryQuery();
	const [coingeckoHistory, setCoingeckoHistory] = useState<Map<string, string[]>>(new Map());
	const [fromPrices, setFromPrices] = useState<string[] | undefined>([]);
	const [chartData, setChartData] = useState<ChartData[]>([]);

	const getEveryNthEl = (arr: string[], nth: number) => arr.filter((_, i) => i % nth === 0);

	useEffect(() => {
		if (from !== Coin.SELECT && to !== Coin.SELECT) {
			const priceMap: Map<string, string[]> = new Map();
			const tokenIds = [geckoMapping[from], geckoMapping[to]];
			const tokenHistory = tokenIds.map(async (token) => await coingeckoHistoryTrigger(token));
			console.log({ tokenHistory });
			Promise.all(tokenHistory).then((tokenHistory) => {
				tokenHistory.forEach((history) => {
					if (!history) return;
					console.log({ history });
					priceMap.set(history?.originalArgs!, history?.data.prices);
				});
				setCoingeckoHistory(priceMap);
			});
		}
	}, [from, to]);

	useEffect(() => {
		if (coingeckoHistory.size !== 0) {
			console.log(coingeckoHistory, 'history');
			if (from === Coin.USDC || to === Coin.USDC || from === Coin.DAI || to === Coin.DAI) {
				setFromPrices(coingeckoHistory.get(geckoMapping[from]));
				console.log({ fromPrices });
			}
		}
	}, [coingeckoHistory, from, to]);

	useEffect(() => {
		if (fromPrices && fromPrices.length) {
			const data: ChartData[] = [];
			labels.map((label, i) => {
				data.push({
					name: label,
					price: fromPrices[i][1],
					amt: getEveryNthEl(fromPrices, 7)[i][1], //blue stuff
				});
			});
			setChartData(data);
			console.log({ chartData });
		}
	}, [fromPrices]);
	//Check what USD or DAI is from or to
	//Set the USD as the Y axis
	//const labels string []= ['1 Month', '3 Weeks', '2 Weeks', '1 Week', 'Now'];
	//const price string []= USD min and max in array
	//const amt string []= Get the array items history[0][1], history[7][1], history[14][1], history[21][1], history[28][1] for the other token

	return (
		<div className='h-52 min-h-full w-52 min-w-full'>
			<ResponsiveContainer height='100%' width='100%'>
				<AreaChart data={chartData}>
					<XAxis dataKey='name' />
					<YAxis dataKey='price' />
					<Tooltip />
					<Area type='monotone' dataKey='amt' stroke='#81a8ce' fill='#81a8ce' />
				</AreaChart>
			</ResponsiveContainer>
		</div>
	);
};
