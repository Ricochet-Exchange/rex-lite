import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { startFlow, upgrade } from '@richochet/api/ethereum';
import { transformError } from '@richochet/utils/transformError';
import { getAccount, getContract } from '@wagmi/core';
import { idaABI } from 'constants/ABIs/ida';
import { superTokenABI } from 'constants/ABIs/supertoken';
import { idaAddress, MATICxAddress } from 'constants/polygon_config';
import { ethers } from 'ethers';
import { PositionData } from './../../components/positions/positions';
import { approve, downgrade, downgradeMatic, stopFlow, upgradeMatic } from './../../pages/api/ethereum';

const streamApi = createApi({
	keepUnusedDataFor: 60, // 60 seconds (default)
	reducerPath: 'streams',
	baseQuery: fetchBaseQuery(),
	endpoints: (builder) => ({
		startStream: builder.query<
			{
				amount: string;
				config: {
					[key: string]: string;
				};
			} | null,
			{
				amount: string;
				config: {
					[key: string]: string;
				};
			}
		>({
			//Payload type:
			//config.superToken,
			//config.tokenA,
			//config.tokenB,
			//normalizedAmount,
			//config.referralId

			queryFn: async (payload: any): Promise<any | undefined> => {
				try {
					const { amount, config } = payload;
					console.log({ config, amount });
					// we must initialize a contract address with idaContract: getContract(idaAddress, idaABI, web3);
					const idaContract = await getContract({ address: idaAddress, abi: idaABI });
					console.log({ idaContract });
					// We must normalize the payload amount for superfluid function
					const normalizedAmount = ethers.utils.parseEther(amount);
					//  Math.round((Number(amount) * 1e18) / 2592000);
					console.log({ normalizedAmount });
					// we must call the startFlow function in api/ethereum.ts with following Data
					//
					//idaContract: Initialized Contract Object from line 18 comment,
					//exchangeAddress: string, (part of config) from user input
					//inputTokenAddress: string,  (part of config) from user input
					//outputTokenAddress: string, (part of config) from user input
					//amount: number, // (part of config) from user input
					//web3: Web3,  //Initialized in line 17, WEB3 object
					//referralId?: string, //this comes from state
					const tx = await startFlow(
						idaContract,
						config.superToken,
						config.tokenA,
						config.tokenB,
						normalizedAmount,
						config.referralId
					);
					console.log('Transaction Results: ', tx);
					return tx?.wait(1).then((res) => {
						return {
							data: res,
						};
					});
				} catch (e) {
					console.error(e);
					const error = transformError(e);
					return { error };
				}
			},
		}),
		stopStream: builder.query<PositionData | null, PositionData>({
			queryFn: async (payload: any): Promise<any | undefined> => {
				try {
					const { superToken, tokenA } = payload;
					const tx = stopFlow(superToken, tokenA);
					console.log({ tx });
					return tx
						.then((data) => {
							return {
								data,
							};
						})
						.then((error) => {
							return { error };
						});
				} catch (e) {
					console.error(e);
					const error = transformError(e);
					return { error };
				}
			},
		}),
		downgrade: builder.query<{ value: string; tokenAddress: string } | null, { value: string; tokenAddress: string }>({
			queryFn: async (payload: any): Promise<any | undefined> => {
				try {
					console.log({ payload });
					const { tokenAddress, value } = payload;
					const amount = ethers.utils.parseEther(value);
					// Math.round(Number(value) * 10e18).toString();
					console.log({ amount });
					const { address } = getAccount();
					const contract = await getContract({ address: tokenAddress, abi: superTokenABI });
					console.log({ contract });
					const tx =
						tokenAddress === MATICxAddress
							? await downgradeMatic(contract, amount, address!)
							: await downgrade(contract, amount, address!);
					console.log({ tx });
					return tx.wait(1).then((res) => {
						return {
							data: res,
						};
					});
				} catch (e: any) {
					console.error(e);
					const error = transformError(e);
					return { error };
				}
			},
		}),
		upgrade: builder.query<{ value: string; tokenAddress: string } | null, { value: string; tokenAddress: string }>({
			queryFn: async (payload: any): Promise<any | undefined> => {
				try {
					const { tokenAddress, value } = payload;
					const { address } = getAccount();
					const contract = await getContract({ address: tokenAddress, abi: superTokenABI });
					const amount = ethers.utils.parseEther(value);
					const tx =
						tokenAddress === MATICxAddress
							? await upgradeMatic(contract, amount, address!)
							: await upgrade(contract, amount, address!);
					console.log({ tx });
					return tx.wait(1).then((res) => {
						return {
							data: res,
						};
					});
				} catch (e) {
					console.error(e);
					const error = transformError(e);
					return { error };
				}
			},
		}),
		approve: builder.query<
			{ tokenAddress: string; superTokenAddress: string } | null,
			{ tokenAddress: string; superTokenAddress: string }
		>({
			queryFn: async (payload: any): Promise<any | undefined> => {
				try {
					const { tokenAddress, superTokenAddress } = payload;
					console.log({ payload });
					const { address } = getAccount();
					// Allow max instead of amount
					const amount = ethers.BigNumber.from('2').pow(ethers.BigNumber.from('256')).sub(ethers.BigNumber.from('1'));
					console.log({ amount });
					const contract = await getContract({ address: tokenAddress, abi: superTokenABI });
					console.log({ contract });
					const tx = await approve(contract, address!, superTokenAddress, amount);
					console.log({ tx });
					return tx.wait(1).then((res) => {
						return {
							data: res,
						};
					});
				} catch (e) {
					console.error(e);
					const error = transformError(e);
					return { error };
				}
			},
		}),
	}),
});

export default streamApi;
