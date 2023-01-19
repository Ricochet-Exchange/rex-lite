import { formatCurrency } from '@richochet/utils/helperFunctions';
import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import { TokenData } from '../balances';

interface Props {
	tokens: TokenData[];
}

interface ChartData {
	name: string;
	color: string;
	value: number;
}

export const DoughnutChart: NextPage<Props> = ({ tokens }): JSX.Element => {
	const { t } = useTranslation('home');
	const [total, setTotal] = useState<number>(0);
	const [chartData, setChartData] = useState<ChartData[]>([]);
	useEffect(() => {
		const data: ChartData[] = [];
		tokens
			.filter((token) => !!token.color)
			.map((token) => {
				data.push({
					name: token.token,
					color: token.color,
					value: token.dollarVal,
				});
			});
		setChartData(data);
	}, [tokens]);
	useEffect(() => {
		const total: number = tokens
			.filter((token) => !!token.walletAmount && token.walletAmount !== 'N/A')
			.reduce((accumulator, current) => accumulator + parseFloat(current.walletAmount), 0);
		setTotal(total);
	}, [tokens]);
	return (
		<div className='h-52 w-52'>
			<ResponsiveContainer height='100%' width='100%'>
				<PieChart>
					<text fill='#81a8ce' x={100} y={80} textAnchor='middle' dominantBaseline='middle'>
						{t('total')}
					</text>
					<text fill='white' x={100} y={110} fontWeight={600} textAnchor='middle' dominantBaseline='middle'>
						{formatCurrency(total)}
					</text>
					<Pie
						data={chartData}
						innerRadius={80}
						outerRadius={100}
						fill='#81a8ce'
						paddingAngle={0}
						nameKey='name'
						dataKey='value'>
						{chartData.map((entry) => (
							<Cell key={`cell-${entry.name}`} fill={entry.color} />
						))}
					</Pie>
				</PieChart>
			</ResponsiveContainer>
		</div>
	);
};
