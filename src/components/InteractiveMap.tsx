import React from 'react'
import Map from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'


export const InteractiveMap: React.FC = () => {
    return (
        <div className="w-full h-full">
            <h2 className="text-2xl font-bold mb-4">Melbourne CBD</h2>
            <div className="w-full h-[calc(100vh-200px)] min-h-[400px]">
                <Map
                    initialViewState={{
                        latitude: -37.8136,
                        longitude: 144.9631,
                        zoom: 13,
                        bearing: 0,
                        pitch: 0
                    }}
                    mapStyle="mapbox://styles/mapbox/streets-v11"
                    mapboxAccessToken="pk.eyJ1IjoibW9uYXNoYXVyYWUiLCJhIjoiY2pyMGJqbzV2MDk3dTQ0bndqaHA4d3hzeSJ9.TDvqYvsmY1DHhE8N8_UbFg"
                >
                </Map>
            </div>
        </div>
    )
}

export default InteractiveMap