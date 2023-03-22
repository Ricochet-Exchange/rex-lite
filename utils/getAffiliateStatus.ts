import { readContract } from '@wagmi/core';
import { referralABI } from 'constants/ABIs/referralABI';
import { rexReferralAddress } from 'constants/polygon_config';
import { ethers } from 'ethers';

export enum AFFILIATE_STATUS {
	'INACTIVE' = 'inactive',
	'REGISTERING' = 'registering',
	'AWAITING_VERIFICATION' = 'awaitingVerification',
	'ENABLED' = 'enabled',
}

const validations = (input: string): [boolean, string][] => {
	const criteria: [boolean, string][] = [
		[new Blob([input]).size <= 32, 'Cannot be larger than 32 characters (Some characters count as 2)'],
		[input.length > 1, 'Must be at least 2 characters'],
	];
	return criteria;
};

export const filterValidationErrors = (input: string) =>
	validations(input).reduce<string[]>((acc: string[], each) => {
		if (each[0] === false) {
			return [...acc, each[1]];
		}
		return acc;
	}, []);

export const getAffiliateStatus = async (address: string, setCurrentReferralId = (referralId: string) => {}) => {
	//note add multi network support here
	const affiliateId: any = await readContract({
		address: rexReferralAddress,
		abi: referralABI,
		functionName: 'addressToAffiliate',
		args: [address.toLowerCase()],
	});

	const res: any = await readContract({
		address: rexReferralAddress,
		abi: referralABI,
		functionName: 'affiliates',
		args: [affiliateId],
	});

	if (ethers.BigNumber.from(res.addr).isZero()) {
		return AFFILIATE_STATUS.INACTIVE;
	}

	if (res.enabled === false) {
		return AFFILIATE_STATUS.AWAITING_VERIFICATION;
	}

	if (filterValidationErrors(res.id).length === 0) {
		setCurrentReferralId(res.id);
		return AFFILIATE_STATUS.ENABLED;
	}
};
