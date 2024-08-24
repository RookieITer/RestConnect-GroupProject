import React, { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'


mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN || ''

const pointsOfInterest = [
    { id: 1, type: 'landmark', name: 'Federation Square', coordinates: [144.9688, -37.8182] },
    { id: 2, type: 'park', name: 'Royal Botanic Gardens', coordinates: [144.9795, -37.8304] },
    { id: 3, type: 'museum', name: 'National Gallery of Victoria', coordinates: [144.9689, -37.8226] },
    { id: 4, type: 'stadium', name: 'Melbourne Cricket Ground', coordinates: [144.9834, -37.8200] },
    { id: 5, type: 'market', name: 'Queen Victoria Market', coordinates: [144.9566, -37.8076] },
]

export const InteractiveMap: React.FC = () => {
    const mapContainer = useRef<HTMLDivElement | null>(null)
    const map = useRef<mapboxgl.Map | null>(null)
    const [filters, setFilters] = useState({
        landmark: true,
        park: true,
        museum: true,
        stadium: true,
        market: true,
    })

    useEffect(() => {
        if (map.current) return // Initialize map only once

        map.current = new mapboxgl.Map({
            container: mapContainer.current!,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [144.9631, -37.8136], // Melbourne coordinates
            zoom: 12
        })

        map.current.on('load', () => {
            // Add a GeoJSON source with points
            map.current!.addSource('points', {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: pointsOfInterest.map(poi => ({
                        type: 'Feature',
                        geometry: {
                            type: 'Point',
                            coordinates: poi.coordinates
                        },
                        properties: {
                            id: poi.id,
                            type: poi.type,
                            name: poi.name
                        }
                    }))
                }
            })

            // Add a symbol layer
            map.current!.addLayer({
                id: 'points',
                type: 'symbol',
                source: 'points',
                layout: {
                    'icon-image': ['get', 'type'],
                    'icon-allow-overlap': true,
                    'text-field': ['get', 'name'],
                    'text-offset': [0, 1.25],
                    'text-anchor': 'top'
                }
            })

            // Update the map when filters change
            updateMapFilter()
        })
    }, [])

    useEffect(() => {
        if (!map.current) return
        updateMapFilter()
    }, [filters])

    const updateMapFilter = () => {
        type FilterExpressionType = (string | FilterExpressionType)[];
        const filterExpression: FilterExpressionType = ['any'];
        Object.entries(filters).forEach(([key, value]) => {
            if (value) {
                filterExpression.push(['==', ['get', 'type'], key]);
            }
        })
        map.current!.setFilter('points', filterExpression)
    }

    const handleFilterChange = (type: keyof typeof filters) => {
        setFilters(prev => ({ ...prev, [type]: !prev[type] }))
    }

    return (
        <div className="relative w-full h-[600px]">
            <div ref={mapContainer} className="absolute top-0 right-0 left-0 bottom-0" />
            <div className="absolute top-4 left-4 bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-2">Filters</h3>
                <div className="space-y-2">
                    {Object.entries(filters).map(([type, isChecked]) => (
                        <div key={type} className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id={type}
                                checked={isChecked}
                                onChange={() => handleFilterChange(type as keyof typeof filters)}
                                className="form-checkbox h-5 w-5 text-blue-600"
                                aria-label={`Filter ${type}`}
                            />
                            <label htmlFor={type} className="capitalize">
                                {type}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}