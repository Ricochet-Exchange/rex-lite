import { combineClasses } from '@richochet/utils/helperFunctions';
import { NextPage } from 'next';
import { MouseEventHandler } from 'react';
interface Props {
	action: string;
	type: 'button' | 'submit' | 'reset';
	form?: string;
	loading?: boolean;
	primary?: boolean;
	disabled?: boolean;
	icon?: JSX.Element;
	handleClick?: MouseEventHandler<HTMLButtonElement> | undefined;
}

export const RoundedButton: NextPage<Props> = ({
	action,
	type,
	form,
	icon,
	loading,
	primary,
	disabled,
	handleClick,
}) => {
	return (
		<button
			type={type}
			form={form}
			disabled={disabled}
			className={combineClasses(
				primary
					? 'btn-rounded bg-primary-500 hover:bg-primary-300 disabled:bg-primary-200 disabled:text-slate-500 text-slate-800'
					: 'btn-rounded bg-slate-100 hover:bg-slate-300'
			)}
			onClick={handleClick}>
			{!loading ? icon : ''}
			{loading && !icon && (
				<svg
					className='animate-spin -ml-1 mr-2 h-4 w-4 text-slate-800'
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					viewBox='0 0 24 24'>
					<circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
					<path
						className='opacity-75'
						fill='currentColor'
						d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
				</svg>
			)}
			<span>{action}</span>
		</button>
	);
};

export const OutlineButton: NextPage<Props> = ({ action, type, disabled, handleClick }) => {
	return (
		<button type={type} className='btn-pill-outline' disabled={disabled} onClick={handleClick}>
			<span>{action}</span>
		</button>
	);
};

export const SolidButton: NextPage<Props> = ({ action, type, primary, disabled, handleClick }) => {
	return (
		<button
			type={type}
			disabled={disabled}
			className={combineClasses(
				primary
					? 'btn-pill-solid'
					: 'btn-pill-solid bg-slate-100 hover:bg-slate-300 disabled:bg-primary-200 disabled:text-slate-500'
			)}
			onClick={handleClick}>
			<span>{action}</span>
		</button>
	);
};
