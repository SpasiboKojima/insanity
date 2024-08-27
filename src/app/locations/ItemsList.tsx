'use client';

import { useMap } from '@vis.gl/react-google-maps';
import { ArrowRightIcon } from '~/assets/arrowRight';
import type { Geopoint, POIS_QUERYResult } from '../../../sanity.types';
import { usePointsState } from './pointsState';

interface ItemsListProps {
	pois: POIS_QUERYResult;
}
export const ItemsList = ({ pois }: ItemsListProps) => {
	const map = useMap();

	const setOpenPoint = usePointsState((state) => state.setOpenPoint);
	const setHoveredPoints = usePointsState((state) => state.setHoveredPoints);

	return (
		<div className="flex flex-wrap justify-center gap-8 sm:w-1/2 sm:justify-start">
			{pois.map((point) => (
				<button
					key={point._id}
					className="group h-fit w-72 text-left"
					onClick={() => {
						map?.setCenter(point.position as Required<Geopoint>);
						return setOpenPoint(point._id);
					}}
					onMouseEnter={() => setHoveredPoints(point._id)}
					onMouseLeave={() => setHoveredPoints(point._id)}
				>
					<p className="text-xl font-bold">{point.description}</p>
					<p className="mt-1 text-sm text-gray-400">{point.address}</p>
					<div className="mt-2 flex items-center gap-1 text-sm font-bold">
						Discover <ArrowRightIcon className="size-5 transition-transform group-hover:translate-x-1" />
					</div>
				</button>
			))}
		</div>
	);
};
