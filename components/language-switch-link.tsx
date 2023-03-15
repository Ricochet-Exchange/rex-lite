import Link from 'next/link';
import { useRouter } from 'next/router';
import languageDetector from '../lib/languageDetector';

const LanguageSwitchLink = ({ locale, ...rest }: any) => {
	const router = useRouter();

	let href = rest.href || router.asPath;
	let pName = router.pathname;
	Object.keys(router.query).forEach((k: string) => {
		if (k === 'locale') {
			pName = pName.replace(`[${k}]`, locale);
			return;
		}
		// @ts-ignore
		pName = pName.replace(`[${k}]`, router.query[k]);
	});
	if (locale) {
		href = rest.href ? `/${locale}${rest.href}` : pName;
	}

	return (
		<Link className='text-sm text-slate-200' href={href} onClick={() => languageDetector.cache?.(locale)}>
			{locale}
		</Link>
	);
};

export default LanguageSwitchLink;
