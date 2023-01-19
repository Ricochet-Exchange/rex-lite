import { PlusSmallIcon } from '@heroicons/react/24/solid';
import { getFlowUSDValue } from '@richochet/utils/getFlowUsdValue';
import { polygon } from '@wagmi/chains';
import { fetchBalance } from '@wagmi/core';
import { flowConfig, FlowEnum, InvestmentFlow } from 'constants/flowConfig';
import { tokenArray } from 'constants/polygon_config';
import { sushiSwapPools } from 'constants/poolAddresses';
import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import sushiswapSubgraphApi from 'redux/slices/sushiswapSubgraph.slice';
import { useAccount } from 'wagmi';
import { RoundedButton } from '../button';
import { CardTitle } from '../cards';
import { DataTable } from '../table';
import { NewPosition } from './new-position';
import { ViewPosition } from './view-position';

export interface PositionData extends InvestmentFlow {
	positions: number;
	timeLeft: number;
	endDate: string;
	usdValue: string;
	input: number;
	output: string;
	avgPrice: string;
}

interface Props {
	positions: InvestmentFlow[];
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
	>;
	coingeckoPrices: Map<string, number>;
}

const positionTitles = ['symbols', 'positions', 'total invested', 'investment rate', 'average price'];

export const Positions: NextPage<Props> = ({ coingeckoPrices, positions, queries }) => {
	const { t } = useTranslation('home');
	const [positionList, setPositionList] = useState<PositionData[]>([]);
	const [balances, setBalances] = useState<Map<string, string>>(new Map());
	const [newPosition, newPositionClosed] = useState(true);
	const [selectedPosition, setSelectedPosition] = useState<PositionData>();
	const [closePosition, setClosePosition] = useState(true);
	const { address, isConnected } = useAccount();
	const [querySushiPoolPrices] = sushiswapSubgraphApi.useQuerySushiPoolPricesMutation();
	const sumStrings = (a: number, b: string): number => {
		return a + parseFloat(b);
	};
	const endDate = (bal: number, outgoing: number): string => {
		const outgoingPerMs = outgoing / (30 * 24 * 60 * 60 * 1000);
		const endDateTimestamp = Date.now() + bal / outgoingPerMs;
		const endDateStr = new Date(endDateTimestamp).toLocaleDateString();
		return `${endDateStr}`;
	};
	const retrieveEndDate = (
		flowKey: FlowEnum,
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
		currentBalances: Map<string, string>
	) => {
		const flow = flowConfig.find((flow_) => flow_.flowKey === flowKey);
		const sameCoinAFlows = flowConfig.filter((flow_) => flow_.coinA === flow?.coinA);
		const outgoing = sameCoinAFlows.map((flow_) => queries.get(flow_.flowKey)?.placeholder || '0');
		const outgoingSum = outgoing.reduce(sumStrings, 0);
		const bal = parseFloat((currentBalances && currentBalances.get(flow?.tokenA || '')) || '0');
		return endDate(bal, outgoingSum);
	};
	const computeStreamEnds = (
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
		currentBalances: Map<string, string>
	) => {
		const streamEnds: Map<string, string> = new Map();
		Object.values(FlowEnum).forEach((flowEnum: FlowEnum) => {
			streamEnds.set(flowEnum, retrieveEndDate(flowEnum, queries, currentBalances));
		});
		return streamEnds;
	};
	const getTimeRemaining = (endDate: string) => {
		const total = Date.parse(endDate) - Date.parse(new Date().toLocaleDateString());
		const seconds = Math.floor((total / 1000) % 60);
		const minutes = Math.floor((total / 1000 / 60) % 60);
		const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
		const days = Math.floor(total / (1000 * 60 * 60 * 24));

		return {
			total,
			days,
			hours,
			minutes,
			seconds,
		};
	};
	useEffect(() => {
		const currBalances = tokenArray.map(async (token) => {
			const balance = await fetchBalance({
				address: address!,
				chainId: polygon.id,
				token: token as `0x${string}`,
			}).then((res) => res?.formatted);
			return { token, balance };
		});
		Promise.all(currBalances).then((res) => {
			const balanceMap: Map<string, string> = new Map();
			res.map((r) => balanceMap.set(r?.token, r?.balance));
			setBalances(balanceMap);
		});
	}, [address, isConnected]);
	useEffect(() => {
		if (isConnected && queries.size > 0 && positions.length > 0) {
			const streamEnds = computeStreamEnds(queries, balances);
			const avgPrices = positions.map(async (position) => {
				const sushiPrice = await querySushiPoolPrices(sushiSwapPools[`${position.coinA}-${position.coinB}`]).then(
					(res: any) => res?.data?.data?.pair?.token0Price
				);
				return { position, sushiPrice };
			});
			Promise.all(avgPrices).then((res) => {
				const positions: PositionData[] = [];
				res.map((r) => {
					const timeLeft = getTimeRemaining(streamEnds.get(r?.position?.flowKey)!);
					positions.push({
						...r?.position,
						positions: queries.get(r?.position?.flowKey)?.totalFlows || 0,
						usdValue: getFlowUSDValue(r?.position, queries, coingeckoPrices, 2),
						input: queries.get(r?.position?.flowKey)?.streamedSoFar || 0,
						output: queries.get(r?.position?.flowKey)?.placeholder!,
						timeLeft: timeLeft.days,
						endDate: new Date(streamEnds.get(r?.position?.flowKey)!).toLocaleDateString('en-us', {
							year: 'numeric',
							month: 'long',
							day: 'numeric',
						}),
						avgPrice: r?.sushiPrice || '0',
					});
				});
				setPositionList(positions);
			});
		}
	}, [isConnected, queries, balances, positions]);
	return (
		<>
			{newPosition && (
				<div className='mt-4'>
					<CardTitle
						content={
							<>
								<p className='text-primary-500 uppercase'>{t('your-positions')}</p>
								<RoundedButton
									icon={<PlusSmallIcon className='h-4 w-4' />}
									type='button'
									action={`${t('new-position')}`}
									handleClick={() => {
										newPositionClosed(false);
									}}
								/>
							</>
						}
					/>
					{closePosition && (
						<DataTable
							headers={positionTitles}
							rowData={positionList}
							tableLoaderRows={12}
							selectable={true}
							selectData={(data: PositionData) => {
								setSelectedPosition(data);
								setClosePosition(false);
							}}
						/>
					)}
					{!closePosition && (
						<ViewPosition close={closePosition} setClose={setClosePosition} position={selectedPosition!} />
					)}
				</div>
			)}
			{!newPosition && <NewPosition close={newPosition} setClose={newPositionClosed} />}
		</>
	);
};
