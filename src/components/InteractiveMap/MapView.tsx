import React from 'react'
import Map, { Marker } from 'react-map-gl'
import { Icons } from '@/components/Icons'
import { ToiletData, OpenSpaceData, FilterState } from '@/utils/types'
import { ToiletPopup, OpenSpacePopup } from './Popups'
import { filterToilets, filterOpenSpaces } from '@/utils/utils'

interface MapViewProps {
    toilets: ToiletData[]
    openSpaces: OpenSpaceData[]
    filter: FilterState
    selectedItem: ToiletData | OpenSpaceData | null
    onItemSelect: (item: ToiletData | OpenSpaceData | null) => void
}

export const MapView: React.FC<MapViewProps> = ({ toilets, openSpaces, filter, selectedItem, onItemSelect }) => {
    return (
        <div className="w-full h-[calc(100vh-200px)] min-h-[400px] rounded-lg overflow-hidden">
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
                {(filter.locationType === 'all' || filter.locationType === 'toilets') && toilets.filter(toilet => filterToilets(toilet, filter.toiletFilters)).map((toilet) => (
                    <Marker
                        key={`toilet-${toilet.Toilet_ID}-${toilet.lat}-${toilet.lon}`}
                        latitude={toilet.lat}
                        longitude={toilet.lon}
                        anchor="bottom"
                        onClick={e => {
                            e.originalEvent.stopPropagation()
                            onItemSelect(toilet)
                        }}
                    >
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                            <Icons.MapPin className="w-4 h-4 text-white" />
                        </div>
                    </Marker>
                ))}
                {(filter.locationType === 'all' || filter.locationType === 'openSpaces') && openSpaces.filter(space => filterOpenSpaces(space, filter.openSpaceFilters, filter.locationType)).map((space) => (
                    <Marker
                        key={`space-${space.PARK_NAME}-${space.latitude}-${space.longitude}`}
                        latitude={space.latitude}
                        longitude={space.longitude}
                        anchor="bottom"
                        onClick={e => {
                            e.originalEvent.stopPropagation()
                            onItemSelect(space)
                        }}
                    >
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                            <Icons.Trees className="w-4 h-4 text-white" />
                        </div>
                    </Marker>
                ))}

                {selectedItem && 'Toilet_ID' in selectedItem && (
                    <ToiletPopup item={selectedItem} onClose={() => onItemSelect(null)} />
                )}
                {selectedItem && 'PARK_NAME' in selectedItem && (
                    <OpenSpacePopup item={selectedItem} onClose={() => onItemSelect(null)} />
                )}
            </Map>
        </div>
    )
}