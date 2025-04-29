declare module 'leaflet';
declare module 'react-leaflet' {
  import { Map as LeafletMap, MapOptions, TileLayer as LeafletTileLayer, Marker as LeafletMarker } from 'leaflet';
  
  export interface MapContainerProps {
    center: [number, number];
    zoom: number;
    children?: React.ReactNode;
    style?: React.CSSProperties;
  }

  export interface TileLayerProps {
    url: string;
    attribution?: string;
  }

  export interface MarkerProps {
    position: [number, number];
    icon?: any;
    eventHandlers?: {
      click?: () => void;
    };
    children?: React.ReactNode;
  }

  export const MapContainer: React.FC<MapContainerProps>;
  export const TileLayer: React.FC<TileLayerProps>;
  export const Marker: React.FC<MarkerProps>;
  export const Popup: React.FC<{ children: React.ReactNode }>;
  export const useMap: () => LeafletMap;
} 