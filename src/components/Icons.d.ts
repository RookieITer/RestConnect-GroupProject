import * as LucideIcons from "lucide-react";
import { LucideProps } from 'lucide-react';
type PinIconProps = Omit<LucideProps, 'ref'>;
declare const Pin: import("react").ForwardRefExoticComponent<PinIconProps & import("react").RefAttributes<SVGSVGElement>>;
type IconsType = typeof LucideIcons & {
    Pin: typeof Pin;
};
export declare const Icons: IconsType;
export {};
