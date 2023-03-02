import { useTokenHistory } from '@richochet/hooks/useTokenHistory';
import { getPriceRange } from '@richochet/utils/getPriceRange';
import { formatCurrency } from '@richochet/utils/helperFunctions';
import { geckoMapping } from 'constants/coingeckoMapping';
import { Coin } from 'constants/coins';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { PositionData } from '../positions';
interface ChartData {
	name: string;
	price: string;
}

interface Props {
	pairs: Map<string, Coin[]>;
	position?: PositionData;
}

//Instead of these labels get the date from timestamp
// const labels = ['1 Month', '3 Weeks', '2 Weeks', '1 Week', 'Now'];

// Get coingecko token history
export const AreaGraph: NextPage<Props> = ({ pairs, position }) => {
	const { t } = useTranslation('home');
	const history = useTokenHistory(pairs);
	const [fromPrices, setFromPrices] = useState<string[] | undefined>([]);
	const [chartData, setChartData] = useState<ChartData[]>([]);
	const [labels, setLabels] = useState<string[]>([]);
	const [minMax, setMinMax] = useState<string[]>(['0', '0']);

	const toNiceDate = (date: string) => {
		let x =
			date !== 'auto'
				? new Date(date).toLocaleDateString('en-us', {
						month: 'short',
						day: 'numeric',
				  })
				: new Date().toLocaleDateString('en-us', {
						month: 'short',
						day: 'numeric',
				  });
		return x;
	};

	const toK = (num: number) => {
		return formatCurrency(num);
	};

	const getDateLabels = (prices: string[]) => {
		const dates = prices.map((price) => price[0]);
		setLabels(dates);
	};

	//Set Y axis as non USD value token
	useEffect(() => {
		if (history.size > 0 && pairs.size > 0) {
			for (const [key, value] of pairs) {
				if (
					value[0] === Coin.USDC ||
					value[0] === Coin.IbAlluoUSD ||
					value[0] === Coin.StIbAlluoUSD ||
					value[0] === Coin.DAI
				) {
					const { tSort, priceSorted } = getPriceRange(history.get(geckoMapping[value[1]])!);
					if (priceSorted.length && tSort.length) {
						setMinMax([priceSorted[0][1]  || '0', priceSorted[priceSorted.length - 1][1]  || '0']);
						//Grabbing an element from t==0, 1 week, 2 week, 3 weeks, 1 month
						//issue is this will only grab those values, we also want the highest price and lowest price of the month
						// const timeSorted = [tSort[0], tSort[7], tSort[14], tSort[21], tSort[tSort.length - 1]];
						//To Do, get 1 highest price and 1 Lowest price in tSort array, then push them into the timeSorted in the positions they should be in (time wise)
						setFromPrices(tSort);
					}
				}
				if (
					value[1] === Coin.USDC ||
					value[1] === Coin.IbAlluoUSD ||
					value[1] === Coin.StIbAlluoUSD ||
					value[1] === Coin.DAI
				) {
					const { tSort, priceSorted } = getPriceRange(history.get(geckoMapping[value[0]])!);
					if (priceSorted.length && tSort.length) {
						setMinMax([priceSorted[0][1] || '0', priceSorted[priceSorted.length - 1][1]  || '0']);
						//Grabbing an element from t==0, 1 week, 2 week, 3 weeks, 1 month
						//issue is this will only grab those values, we also want the highest price and lowest price of the month
						// const timeSorted = [tSort[0], tSort[7], tSort[14], tSort[21], tSort[tSort.length - 1]];
						//To Do, get 1 highest price and 1 Lowest price in tSort array, then push them into the timeSorted in the positions they should be in (time wise)
						setFromPrices(tSort);
					}
				}
			}
		}
	}, [history, pairs]);

	useEffect(() => {
		if (fromPrices && fromPrices.length) {
			getDateLabels(fromPrices);
		}
	}, [fromPrices]);

	useEffect(() => {
		if (fromPrices && fromPrices.length && labels.length) {
			const data: ChartData[] = [];
			labels.map((label, i) => {
				data.push({
					name: label,
					price: fromPrices[i][1],
				});
			});
			setChartData(data);
		}
	}, [labels, fromPrices]);

	return (
		<>
			<div className='h-52 min-h-full w-52 min-w-full'>
				<ResponsiveContainer height='100%' width='100%'>
					<AreaChart margin={{ top: 0, right: 10, left: 40, bottom: 20 }} data={chartData}>
						{/* Add label called time */}
						<XAxis
							dataKey='name'
							tickFormatter={(tick) => toNiceDate(tick)}
							interval='preserveEnd'
							tickMargin={5}
							minTickGap={10}
						/>
						{/* Add label called price and instead of grabbing from 0 to max price, start from lowest price in range - 10% */}
						<YAxis
							dataKey='y'
							tickMargin={5}
							orientation='left'
							tickFormatter={(tick) => toK(tick)}
							interval='preserveEnd'
							domain={[minMax[0], minMax[1]]}
						/>
						<Tooltip />
						<Area type='monotone' dataKey='price' stroke='#81a8ce' fill='#81a8ce' />
					</AreaChart>
				</ResponsiveContainer>
			</div>
			{position && (
				<p className='text-slate-100 my-2 pl-14'>
					<span className='text-slate-400'>{t('average-buy-price')}:</span> 1 {position.coinB} ={' '}
					{((+minMax[0] + +minMax[1]) / 2).toFixed(3)} {position.coinA}
				</p>
			)}
		</>
	);
};
