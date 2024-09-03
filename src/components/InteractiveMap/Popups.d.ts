import React from 'react';
import { ToiletData, OpenSpaceData } from '@/utils/types';
interface PopupProps {
    item: ToiletData | OpenSpaceData;
    onClose: () => void;
}
export declare const ToiletPopup: React.FC<PopupProps>;
export declare const OpenSpacePopup: React.FC<PopupProps>;
export {};
