import type { SVGProps } from 'react';

export function FlagIcon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M19 4C19.8522 4 20.2974 4.98551 19.7832 5.62253L19.7071 5.70711L15.915 9.5L19.7071 13.2929C20.3097 13.8955 19.9277 14.9072 19.1136 14.994L19 15H6V21C6 21.5128 5.61396 21.9355 5.11662 21.9933L5 22C4.48716 22 4.06449 21.614 4.00673 21.1166L4 21V5C4 4.48716 4.38604 4.06449 4.88338 4.00673L5 4H19ZM16.584 6H6V13H16.585L13.7929 10.2071C13.4324 9.84662 13.4047 9.27939 13.7097 8.8871L13.7929 8.79289L16.584 6Z"
				fill="currentColor"
			/>
		</svg>
	);
}
