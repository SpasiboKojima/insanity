import { MarkerClusterer, type Marker } from '@googlemaps/markerclusterer';
import { useMap } from '@vis.gl/react-google-maps';
import { useCallback, useEffect, useMemo, useState } from 'react';

export const useMapClusterer = () => {
	const [markers, setMarkers] = useState<Record<string, Marker>>({});

	const map = useMap();
	const clusterer = useMemo(() => {
		if (!map) return null;

		return new MarkerClusterer({ map });
	}, [map]);

	useEffect(() => {
		if (!clusterer) return;

		clusterer.clearMarkers();
		clusterer.addMarkers(Object.values(markers));
	}, [clusterer, markers]);

	const setMarkerRef = useCallback((marker: Marker | null, key: string) => {
		setMarkers((markers) => {
			if ((marker && markers[key]) || (!marker && !markers[key])) return markers;

			if (marker) {
				return { ...markers, [key]: marker };
			}
			const { [key]: _, ...newMarkers } = markers;

			return newMarkers;
		});
	}, []);

	return {
		setMarkerRef,
	};
};
