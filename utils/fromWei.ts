import { ethers } from 'ethers';

const zero = ethers.BigNumber.from(0);
const negative1 = ethers.BigNumber.from(-1);

function fromWei(
	weiInput: string,
	decimals: number,
	options: { pad?: boolean; commify?: boolean } = { pad: false, commify: false }
) {
	let wei = ethers.BigNumber.from(weiInput); // eslint-disable-line
	let negative = wei.lt(zero); // eslint-disable-line
	const base = ethers.BigNumber.from(10).pow(ethers.BigNumber.from(decimals));
	const baseLength = decimals;
	if (negative) {
		wei = wei.mul(negative1);
	}
	let fraction = wei.mod(base).toString(); // eslint-disable-line
	while (fraction.length < baseLength) {
		fraction = `0${fraction}`;
	}
	if (!options.pad) {
		const fractionParts = fraction.match(/^([0-9]*[1-9]|0)(0*)/);
		if (fractionParts) fraction = fractionParts[1]; // eslint-disable-line
	}
	let whole = wei.div(base).toString(); // eslint-disable-line
	if (options.commify) {
		whole = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	}
	let value = `${whole}${fraction == '0' ? '' : `.${fraction}`}`; // eslint-disable-line
	if (negative) {
		value = `-${value}`;
	}
	return value;
}

function trimPad(amount: string, decimals: number) {
	if (!amount) return '-';
	const [int, fract] = amount.split('.');
	let fractional = fract || '';
	fractional = fractional.slice(0, decimals);
	while (fractional.length < decimals) {
		fractional = `${fractional}0`;
	}
	const combined = [int];
	if (fractional.length > 0) {
		combined.push(fractional);
	}
	return combined.join('.');
}

function numFormatter(num: number) {
	const si = [
		{ value: 1, symbol: '' },
		{ value: 1e3, symbol: 'K' },
		{ value: 1e6, symbol: 'M' },
		{ value: 1e9, symbol: 'B' },
		{ value: 1e12, symbol: 'T' },
		{ value: 1e15, symbol: 'P' },
		{ value: 1e18, symbol: 'E' },
	];
	const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
	let i;
	for (i = si.length - 1; i > 0; i -= 1) {
		if (num >= si[i].value) {
			break;
		}
	}
	return (num / si[i].value).toFixed(1).toString().replace(rx, '$1') + si[i].symbol;
}

export { fromWei, trimPad, numFormatter };
