import React from 'react';
import { FilterState } from '@/utils/types';
interface MapFiltersProps {
    filter: FilterState;
    onFilterChange: (key: keyof FilterState['toiletFilters'] | keyof FilterState['openSpaceFilters']) => void;
    onLocationTypeChange: (value: FilterState['locationType']) => void;
}
export declare const MapFilters: React.FC<MapFiltersProps>;
export {};
