import { Framework } from '@superfluid-finance/sdk-core';
import { getProvider } from '@wagmi/core';
import { polygon } from 'wagmi/chains';

export const getSFFramework = async () => {
	const provider = getProvider({ chainId: 80001 });
	return await Framework.create({
		provider: provider,
		chainId: 80001,
	});
};
