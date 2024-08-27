import type { MapCameraChangedEvent } from '@vis.gl/react-google-maps';
import { create } from 'zustand';

export const cameraStateKey = 'camera_state';

export interface CameraState {
  bounds: MapCameraChangedEvent['detail']['bounds'];
  center: MapCameraChangedEvent['detail']['center'];
  zoom: MapCameraChangedEvent['detail']['zoom'];
}

interface GetCameraStateProps {
  searchParams: Record<string, string | string[] | undefined>;
}

export const getCameraState = ({ searchParams }: GetCameraStateProps) => {
  const stateParam = searchParams[cameraStateKey];
  if (!stateParam || typeof stateParam !== 'string') return {};
  const cameraState = JSON.parse(stateParam);

  return {
    bounds: cameraState.bounds,
    center: cameraState.center,
    zoom: cameraState.zoom,
  } satisfies Partial<CameraState>;
};

interface PointsState {
  openPoints: Record<string, boolean>;
  hoveredPoints: Record<string, boolean>;
  setOpenPoint: (id: string) => void;
  setHoveredPoints: (id: string) => void;
}

export const usePointsState = create<PointsState>()((set, get) => ({
  openPoints: {},
  hoveredPoints: {},
  setOpenPoint: (id) => {
    const newOpenPoints = { ...get().openPoints };
    newOpenPoints[id] = !newOpenPoints[id];
    return set({ openPoints: newOpenPoints });
  },
  setHoveredPoints: (id) => {
    const newHoveredPoints = { ...get().hoveredPoints };
    newHoveredPoints[id] = !newHoveredPoints[id];
    return set({ hoveredPoints: newHoveredPoints });
  },
}));
