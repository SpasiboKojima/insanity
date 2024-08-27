'use client';

import { APIProvider } from '@vis.gl/react-google-maps';
import type { POIS_QUERYResult } from '../../../sanity.types';
import { CustomMap } from './CustomMap';
import { ItemsList } from './ItemsList';
import type { CameraState } from './pointsState';

interface LocationsProps {
	pois: POIS_QUERYResult;
	cameraState: Partial<CameraState>;
}

export const Locations = ({ pois, cameraState }: LocationsProps) => {
	return (
		<APIProvider apiKey={process.env.NEXT_PUBLIC_REACT_APP_GOOGLE_MAPS_API_KEY || ''}>
			<div className="flex w-full gap-4">
				<ItemsList pois={pois} />
				<CustomMap pois={pois} cameraState={cameraState} />
			</div>
		</APIProvider>
	);
};
