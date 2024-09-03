import { type ClassValue } from "clsx";
import { ToiletData, OpenSpaceData, FilterState } from './types';
export declare function cn(...inputs: ClassValue[]): string;
export declare const filterToilets: (toilet: ToiletData, filters: FilterState["toiletFilters"]) => boolean;
export declare const filterOpenSpaces: (space: OpenSpaceData, filters: FilterState["openSpaceFilters"], locationType: FilterState["locationType"]) => boolean;
export declare const handleCopyLocation: (location: string) => Promise<void>;
