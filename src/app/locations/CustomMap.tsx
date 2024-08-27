'use client';

// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
import { Map, type MapCameraChangedEvent } from '@vis.gl/react-google-maps';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { debounce } from '~/lib/utils/debounce';
import type { POIS_QUERYResult } from '../../../sanity.types';
import { Point } from './Point';
import { cameraStateKey, type CameraState } from './pointsState';
import { useMapClusterer } from './useMapClusterer';

const debounceUpdate = debounce((callback: () => void) => {
	callback();
}, 500);

const defaultCenter = {
	lat: 37.50024109655184,
	lng: -122.28528451834352,
};

interface CustomMapProps {
	pois: POIS_QUERYResult;
	cameraState: Partial<CameraState>;
}

export const CustomMap = ({ pois, cameraState }: CustomMapProps) => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const { setMarkerRef } = useMapClusterer();

	const createQueryString = (name: string, value: string) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set(name, value);

		return params.toString();
	};

	const handleCameraChange = (e: MapCameraChangedEvent) => {
		debounceUpdate(() => {
			const newCameraState: CameraState = {
				bounds: e.detail.bounds,
				zoom: e.detail.zoom,
				center: {
					lat: e.detail.center.lat,
					lng: e.detail.center.lng,
				},
			};

			router.push(`${pathname}?${createQueryString(cameraStateKey, JSON.stringify(newCameraState))}`);
		});
	};

	return (
		<div className="hidden h-[750px] w-1/2 overflow-hidden rounded-[32px] sm:block">
			<Map
				className="size-full"
				defaultZoom={cameraState.zoom || 13}
				defaultCenter={cameraState.center || defaultCenter}
				gestureHandling="greedy"
				disableDefaultUI
				onCameraChanged={handleCameraChange}
				mapId="978ac89ddc22eaff"
			>
				{pois.map((point) => (
					<Point key={point._id} point={point} setMarkerRef={setMarkerRef} />
				))}
			</Map>
		</div>
	);
};
