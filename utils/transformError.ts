export const transformError = (e?: any) => {
	if (e?.data?.error) {
		return e.data.error;
	} else if (e?.error?.code === 4001) {
		return e?.message;
	} else if (e?.code === -32603) {
		return e?.data?.message.replace('execution reverted:', '');
	} else if (e?.error?.code === -32603) {
		return e.error?.data?.message.replace('execution reverted:', '');
	} else if (e?.message.includes('Already streaming')) {
		return 'You already have a stream open with these tokens. Please try another set of tokens';
	} else {
		return 'Operation failed. Refresh the page or try again later.';
	}
};
