import React from 'react';
import { ToiletData, OpenSpaceData, FilterState } from '@/utils/types';
interface MapViewProps {
    toilets: ToiletData[];
    openSpaces: OpenSpaceData[];
    filter: FilterState;
    selectedItem: ToiletData | OpenSpaceData | null;
    onItemSelect: (item: ToiletData | OpenSpaceData | null) => void;
}
export declare const MapView: React.FC<MapViewProps>;
export {};
