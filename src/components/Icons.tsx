import { forwardRef } from 'react';
import * as LucideIcons from "lucide-react";
import { LucideProps } from 'lucide-react';

// Define the type for our custom Pin icon
type PinIconProps = Omit<LucideProps, 'ref'>;

// Create the Pin icon using forwardRef
const Pin = forwardRef<SVGSVGElement, PinIconProps>((props, ref) => {
    const { size = 24, ...restProps } = props;
    return (
        <svg ref={ref} width={size} height={size} viewBox="0 0 24 24" {...restProps}>
            <path d="M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
C20.1,15.8,20.2,15.8,20.2,15.7z" />
        </svg>
    );
});

Pin.displayName = 'Pin';

// Define the type for the Icons object
type IconsType = typeof LucideIcons & {
    Pin: typeof Pin;
};

// Create the Icons object
export const Icons: IconsType = {
    ...LucideIcons,
    Pin,
};