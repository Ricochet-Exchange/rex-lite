import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import languageDetector from './languageDetector';

export const useRedirect = (to?: any) => {
	const router = useRouter();
	const [url, setUrl] = useState('');
	to = to || router.asPath;
	// language detection
	//check if in localhost, if not just add the .html extension to the url when loading
	useEffect(() => {
		if (!url) {return}
		const detectedLng = languageDetector.detect();
		if (to.startsWith('/' + detectedLng) && router.route === '/404') {
			// prevent endless loop
			if (url === 'localhost:3000') {
				router.replace('/' + detectedLng + router.route);
			} else {
				router.replace('/' + detectedLng + '.html' )
			}
			return;
		}

		if (url === 'localhost:3000') {
			router.replace('/' + detectedLng + to);
		} else {
			router.replace('/' + detectedLng + '.html' )
		}
		languageDetector.cache?.(detectedLng!);
	}, [url])

	useEffect(() => {
		setUrl(window ? window.location.host : '');
	}, []);

	return;
};

export const Redirect = () => {
	useRedirect();
	return;
};

// eslint-disable-next-line react/display-name
export const getRedirect = (to: any) => () => {
	useRedirect(to);
	return;
};
