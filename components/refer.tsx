import { UsersIcon } from '@heroicons/react/24/solid';
import { useTranslation } from 'next-i18next';
import { ChangeEvent, useState } from 'react';
import { useAccount } from 'wagmi';
import { SolidButton } from './button';

export const Refer = () => {
	const { t } = useTranslation('home');
	const { address } = useAccount();
	const [refURL, setRefURL] = useState('app.ricochet.exchange/#/ref/');
	const [currentReferralId, setCurrentReferralId] = useState<string | undefined>(address?.toLowerCase().slice(0, 10));
	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		setCurrentReferralId(value);
	};
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event?.preventDefault();
		console.log(refURL + currentReferralId);
	};
	return (
		<div className='flex flex-col items-center space-y-4'>
			<div className='flex items-center justify-center text-slate-100 space-x-3'>
				<UsersIcon className='h-6 w-6' />
				<p className='uppercase tracking-widest'>{t('refer')}</p>
			</div>
			<p className='text-slate-100'>{t('apply-refer')}</p>
			<p className='text-slate-400'>{t('customize-url')}:</p>
			<form onSubmit={handleSubmit} className='w-full space-y-4'>
				<div className='inline-flex py-2 pl-3 w-full border border-primary-500 rounded-lg'>
					<div className='w-2/3 text-primary-700'>
						<span>{refURL}</span>
					</div>
					<input
						type='text'
						minLength={2}
						maxLength={32}
						defaultValue={currentReferralId}
						onChange={(e) => handleChange(e)}
						className='w-1/3 pl-1 pr-3 text-primary-100 placeholder-primary-500 bg-transparent focus:outline-none dark:placeholder-primary-500 '
						placeholder={`${t('referral-url')}`}
					/>
				</div>
				<SolidButton type='submit' primary={true} action={t('register-url')} />
			</form>
			<a
				className='inline-flex items-center space-x-1 text-primary-400'
				href='https://docs.ricochet.exchange/readme/referral-program'
				target='_blank'
				rel='noopener noreferrer'>
				<span className='underline'>{t('how-does-it-work')}</span>
			</a>
		</div>
	);
};
