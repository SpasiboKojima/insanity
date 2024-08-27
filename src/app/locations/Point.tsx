'use client';

import type { Marker } from '@googlemaps/markerclusterer';
import { AdvancedMarker, useMap } from '@vis.gl/react-google-maps';
import { cx } from 'cva';
import { useCallback, type ReactNode } from 'react';
import { FlagIcon } from '~/assets/flag';
import { LocationIcon } from '~/assets/location';
import { MountainIcon } from '~/assets/mountain';
import type { Geopoint, POIS_QUERYResult } from '../../../sanity.types';
import styles from './mapStyles.module.css';
import { usePointsState } from './pointsState';

const iconsMap: Record<string, ReactNode> = {
	home: <MountainIcon />,
	building: <FlagIcon />,
	warehouse: <LocationIcon />,
	default: <LocationIcon />,
};

interface PointComponentProps {
	point: POIS_QUERYResult[number];
	setMarkerRef: (marker: Marker | null, key: string) => void;
}

const PointComponent = ({ point, setMarkerRef }: PointComponentProps) => {
	const map = useMap();
	const isOpen = usePointsState((state) => state.openPoints[point._id]);
	const isHovered = usePointsState((state) => state.hoveredPoints[point._id]);
	const setOpenPoint = usePointsState((state) => state.setOpenPoint);

	const ref = useCallback((marker: google.maps.marker.AdvancedMarkerElement) => setMarkerRef(marker, point._id), [setMarkerRef, point._id]);

	if (!point.position?.lat || !point.position.lng) return null;

	return (
		<AdvancedMarker
			ref={ref}
			className={cx(
				{
					'h-20 w-auto rounded-lg bg-white px-4 py-2 shadow-md': isOpen,
					'bg-green-300 hover:scale-125': !isOpen,
					'scale-125': isHovered && !isOpen,
				},
				'relative flex size-8 items-center justify-center gap-4 rounded-[50%] p-1 text-sm text-gray-700 transition-all duration-300'
			)}
			position={point.position as Required<Geopoint>}
			title={point.description}
			onClick={() => {
				map?.setCenter(point.position as Required<Geopoint>);
				return setOpenPoint(point._id);
			}}
		>
			{!isOpen && <div className={`${styles.icon} text-white`}>{iconsMap[point.type ?? ''] || iconsMap.default}</div>}
			{isOpen && <div className="text-sm">{point.address}</div>}
		</AdvancedMarker>
	);
};

export { PointComponent as Point };
