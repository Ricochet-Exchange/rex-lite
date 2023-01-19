import { RectangleGroupIcon } from '@heroicons/react/24/solid';
import AlertAction from '@richochet/utils/alertAction';
import { getShareScaler } from '@richochet/utils/getShareScaler';
import { Coin } from 'constants/coins';
import { FlowEnum, FlowTypes } from 'constants/flowConfig';
import { RICAddress, twoWayMarketRICUSDCAddress, USDCAddress, USDCxAddress } from 'constants/polygon_config';
import { AlertContext } from 'contexts/AlertContext';
import { ExchangeKeys } from 'enumerations/exchangeKeys.enum';
import { useTranslation } from 'next-i18next';
import { useContext, useState } from 'react';
import streamApi from 'redux/slices/streams.slice';
import { SolidButton } from './button';

export const LaunchPad = () => {
	const { t } = useTranslation('home');
	const [state, dispatch] = useContext(AlertContext);
	const [shareScaler, setShareScaler] = useState(1e3);
	const [startStreamTrigger] = streamApi.useLazyStartStreamQuery();
	const fetchShareScaler = async (exchangeKey: ExchangeKeys, tokenA: string, tokenB: string) => {
		return await getShareScaler(exchangeKey, tokenA, tokenB).then((res) => res);
	};
	const navigateToUniswap = () => {
		const url = `https://app.uniswap.org/#/swap?theme=dark&inputCurrency=${USDCAddress}&outputCurrency=${RICAddress}&exactAmount=100000&exactField=output`;
		window.open(url, '_blank');
	};
	const handleStartPosition = () => {
		const config = {
			superToken: twoWayMarketRICUSDCAddress,
			tokenA: USDCxAddress,
			tokenB: RICAddress,
			coinA: Coin.USDC,
			coinB: Coin.RIC,
			flowKey: FlowEnum.twoWayUsdcRicFlowQuery,
			type: FlowTypes.market,
		};
		console.log({ config });
		const exchangeKey = config?.flowKey?.replace('FlowQuery', '') as ExchangeKeys;
		fetchShareScaler(exchangeKey, config.tokenA, config.tokenB)
			.then((res) => {
				setShareScaler(res);
				// Need to call hook here to start a new stream.
				dispatch(AlertAction.showLoadingAlert('Waiting for your transaction to be confirmed...', ''));
				if (shareScaler) {
					const newAmount =
						config?.type === FlowTypes.market
							? ((((Math.floor((20 / 2592000) * 1e18) / shareScaler) * shareScaler) / 1e18) * 2592000).toString()
							: 20;
					console.log({ newAmount, config });
					//@ts-ignore
					const stream = startStreamTrigger({ amount: newAmount, config });
					stream
						.then((response) => {
							if (response.isSuccess) {
								dispatch(AlertAction.showSuccessAlert('Success', 'Transaction confirmed 👌'));
							}
							if (response.isError) {
								dispatch(AlertAction.showErrorAlert('Error', `${response?.error}`));
							}
							setTimeout(() => {
								dispatch(AlertAction.hideAlert());
							}, 5000);
						})
						.catch((error) => dispatch(AlertAction.showErrorAlert('Error', `${error || error?.message}`)));
				}
			})
			.catch((error) => console.error(error));
	};
	return (
		<div className='flex flex-col space-y-4'>
			<div className='flex items-center justify-center text-slate-100 space-x-3'>
				<RectangleGroupIcon className='h-6 w-6' />
				<p className='uppercase tracking-widest'>Rexpro</p>
			</div>
			<p className='text-slate-100'>{t('start-a-position')}</p>
			<SolidButton type='button' primary={true} action={t('start-20-position')} handleClick={handleStartPosition} />
			<SolidButton type='button' primary={false} action={`${t('buy')} 100,000 RIC`} handleClick={navigateToUniswap} />
		</div>
	);
};
