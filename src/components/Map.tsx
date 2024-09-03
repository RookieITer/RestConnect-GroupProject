import React from 'react';
import { InteractiveMap } from './InteractiveMap/InteractiveMap.tsx';

const Map: React.FC = () => {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Interactive Map</h1>
            <InteractiveMap />
        </div>
    );
};

export default Map;