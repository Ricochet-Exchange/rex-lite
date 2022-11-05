import { ArrowLongRightIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { combineClasses } from '@richochet/utils/functions';
import usePagination from 'hooks/usePagination';
import { BTCLogo } from 'icons/btc-logo';
import { ETHLogo } from 'icons/eth-logo';
import { RicochetLogo } from 'icons/richochet-logo';
import { USDCLogo } from 'icons/usdc-logo';
import { NextPage } from 'next';
import { TokenData } from './balances';
import { MarketData } from './markets';
import { PositionData } from './positions';

interface Props {
	headers: string[];
	rowData: PositionData[] | MarketData[] | TokenData[];
}

const isPositionData = (data: PositionData | MarketData | TokenData): data is PositionData =>
	!!(data as PositionData).position;
const isMarketData = (data: PositionData | MarketData | TokenData): data is MarketData => !!(data as MarketData).market;
const isTokenData = (data: PositionData | MarketData | TokenData): data is TokenData => !!(data as TokenData).token;

export const DataTable: NextPage<Props> = ({ headers, rowData }): JSX.Element => {
	const { firstContentIndex, lastContentIndex, nextPage, prevPage, page, gaps, setPage, totalPages } = usePagination({
		contentPerPage: 6,
		count: rowData.length,
	});
	return (
		<div className='overflow-scroll'>
			<table className='table-fixed min-w-full text-center'>
				<thead>
					<tr>
						{headers.map((title, index) => (
							<th scope='col' key={index} className='font-normal text-slate-400 px-6 py-4"'>
								{title}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{rowData.slice(firstContentIndex, lastContentIndex).map((data, index) => (
						<tr key={index} className='text-slate-200 border-b border-slate-600'>
							{isPositionData(data) ? (
								<>
									<td className='flex items-center px-6 py-4 whitespace-nowrap space-x-1'>
										{data.from === 'RIC' ? <RicochetLogo width='25' height='25' /> : ''}{' '}
										<ArrowLongRightIcon className='h-5 w-5' />
										{data.from === 'USDC' ? <USDCLogo width='22' height='22' /> : ''}
									</td>
									<td className='px-6 py-4 whitespace-nowrap'>{data.position}</td>
									<td className='px-6 py-4 whitespace-nowrap'>{data.timeLeft}</td>
									<td className='px-6 py-4 whitespace-nowrap'>{data.input}</td>
									<td className='px-6 py-4 whitespace-nowrap'>{data.output}</td>
									<td className='px-6 py-4 whitespace-nowrap'>{data.avgPrice}</td>
								</>
							) : isMarketData(data) ? (
								<>
									<td className='px-6 py-4 whitespace-nowrap'>{data.market}</td>
									<td className='px-6 py-4 whitespace-nowrap'>{data.total}</td>
									<td className='px-6 py-4 whitespace-nowrap'>{data.posAmt}</td>
								</>
							) : isTokenData(data) ? (
								<>
									<td className='flex items-center px-6 py-4 whitespace-nowrap space-x-1'>
										{data.token === 'ETH' ? (
											<ETHLogo width='22' height='22' />
										) : data.token === 'BTC' ? (
											<BTCLogo width='22' height='22' />
										) : data.token === 'RIC' ? (
											<RicochetLogo width='22' height='22' />
										) : (
											''
										)}
										<span
											className={combineClasses(
												data.token === 'ETH'
													? 'bg-eth text-slate-800 px-1 py-0'
													: data.token === 'BTC'
													? 'bg-btc text-slate-800 px-1 py-0'
													: data.token === 'RIC'
													? 'bg-ric text-slate-800 px-1 py-0'
													: 'bg-transparent'
											)}>
											{data.token}
										</span>
									</td>
									<td className='px-6 py-4 whitespace-nowrap'>{data.amount}</td>
									<td className='px-6 py-4 whitespace-nowrap'>{data.dollarVal}</td>
								</>
							) : (
								<></>
							)}
						</tr>
					))}
				</tbody>
			</table>
			<div className='flex justify-end text-slate-500 space-x-2 mt-4'>
				<button
					onClick={prevPage}
					className={`${page !== 1 && 'hover:text-slate-300'} ${page === 1 && 'text-slate-600'}`}
					disabled={page === 1}>
					<ChevronLeftIcon className='h-4 w-4' />
				</button>
				<button onClick={() => setPage(1)} className={`${page === 1 && 'text-slate-100'}`}>
					1
				</button>
				{gaps.before ? '...' : ''}
				{gaps.paginationGroup.map((num) => (
					<button onClick={() => setPage(num)} key={num} className={`${page === num ? 'text-slate-100' : ''}`}>
						{num}
					</button>
				))}
				{gaps.after ? '...' : ''}
				{totalPages > 1 && (
					<button onClick={() => setPage(totalPages)} className={`${page === totalPages && 'text-slate-100'}`}>
						{totalPages}
					</button>
				)}
				<button
					onClick={nextPage}
					className={`${page !== totalPages && 'hover:text-slate-300'} ${page === totalPages && 'text-slate-600'}`}
					disabled={page === totalPages}>
					<ChevronRightIcon className='h-4 w-4' />
				</button>
			</div>
		</div>
	);
};
