import { combineClasses, formatCurrency } from '@richochet/utils/helperFunctions';
import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import coingeckoApi from 'redux/slices/coingecko.slice';
import { CoinChange, DataType } from '../coins/coin-change';
import { AreaGraph } from '../graphs/area-graph';
import { EditPosition } from './edit-position';
import { PositionData } from './positions';

interface Props {
	close: boolean;
	setClose: Function;
	position: PositionData;
}

const geckoMapping: Record<string, string> = {
	USDC: 'usd-coin',
	MATIC: 'matic-network',
	ETH: 'ethereum',
	WBTC: 'wrapped-bitcoin',
	DAI: 'dai',
	RIC: 'richochet',
	StIbAlluoETH: 'ethereum',
	StIbAlluoBTC: 'wrapped-bitcoin',
	StIbAlluoUSD: 'usd-coin',
};

export const ViewPosition: NextPage<Props> = ({ setClose, position }) => {
	const { t } = useTranslation('home');
	const [edit, setEdit] = useState(false);
	const [usdPrice, setUsdPrice] = useState<number>(0);
	const {
		data: tokenPrice,
		isLoading: tokenPriceIsLoading,
		isSuccess: tokenPriceIsSuccess,
		isError: tokenPriceIsError,
		error: tokenPriceError,
	} = coingeckoApi.useGetTokenPriceQuery(geckoMapping[position.coinB]);
	useEffect(() => {
		if (tokenPrice && tokenPriceIsSuccess) {
			setUsdPrice(tokenPrice?.[geckoMapping[position.coinB]]?.usd);
		}
		if (tokenPriceIsError) {
			console.error(tokenPriceError);
		}
	}, [tokenPrice, tokenPriceIsSuccess]);
	return (
		<>
			<div className='flex items-center justify-start border-b border-slate-600 space-x-4 mb-6 lg:mb-12 pb-2'>
				<button type='button' className='outline-none text-primary-500 space-x-2' onClick={() => setClose(true)}>
					<span className='no-underline'>&#60;</span>
					<span className='underline'>{t('show-all')}</span>
				</button>
				<button
					type='button'
					className={combineClasses(
						edit
							? 'outline-none text-slate-500 pointer-events-none'
							: 'outline-none text-primary-500 underline cursor-pointer'
					)}
					onClick={() => setEdit(true)}
					disabled={edit}>
					{edit ? `${t('editing-position')}...` : `${t('edit-position')}`}
				</button>
			</div>
			<div className='flex flex-wrap items-start justify-between space-y-4 md:space-y-0'>
				<div className='w-full md:w-1/2'>
					<span className='flex items-center justify-start'>
						<CoinChange coinA={position.coinA} coinB={position.coinB} type={DataType.ViewPosition} />
					</span>
					<p className='text-slate-100 my-2'>
						<span className='text-slate-400'>{t('input')}:</span> {position.input.toFixed(3)} {position.coinA}x
					</p>
					<p className='text-slate-100 my-2'>
						<span className='text-slate-400'>{t('output')}:</span> {parseFloat(position.output).toFixed(3)}{' '}
						{position.coinA}x
					</p>
					<p className='text-slate-100 my-2'>
						<span className='text-slate-400'>{t('time-left')}:</span> {position.timeLeft} {t('days')}
					</p>
					<p className='text-slate-100 my-2'>
						<span className='text-slate-400'>{t('end-date')}:</span> {position.endDate}
					</p>
				</div>
				{!edit && (
					<div className='w-full md:w-1/2'>
						<AreaGraph />
						<p className='text-slate-100 my-2'>
							<span className='text-slate-400'>{t('average-buy-price')}:</span> 1 {position.coinB} ={' '}
							{formatCurrency(usdPrice)}
						</p>
						<div>
							<span className='text-slate-400'>
								{t('average-buy-price')} &#62;&#60; {t('current-price')}:{' '}
							</span>
							<p className='text-slate-100'>
								{formatCurrency(usdPrice)} &#62;&#60; {formatCurrency(usdPrice)}
							</p>
						</div>
					</div>
				)}
				{edit && (
					<div className='w-full md:w-1/2  mt-4'>
						<EditPosition setClose={setEdit} position={position} />
					</div>
				)}
			</div>
		</>
	);
};
