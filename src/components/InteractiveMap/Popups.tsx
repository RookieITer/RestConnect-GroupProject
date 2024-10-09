import React from 'react'
import { Popup } from 'react-map-gl'
import { Button } from "@/components/ui/button"
import { Icons } from '@/components/Icons'
import { ToiletData, OpenSpaceData, ParkingData } from '@/utils/types'
import { handleCopyLocation } from '@/utils/utils'


interface PopupProps {
    item: ToiletData | OpenSpaceData | ParkingData
    onClose: () => void
}

const handleGetDirections = (lat: number, lon: number) => {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`, '_blank')
}





export const ToiletPopup: React.FC<PopupProps> = ({ item, onClose }) => {
    const toilet = item as ToiletData
    const hasChangeFacilities = toilet.wheelchair.toLowerCase() === 'yes' || toilet.baby_facil.toLowerCase() === 'yes'

    return (
        <Popup
            latitude={toilet.lat}
            longitude={toilet.lon}
            anchor="top"
            onClose={onClose}
            closeOnClick={false}
            closeButton={false}
        >
            <div className="p-2 relative bg-white bg-opacity-80 backdrop-filter backdrop-blur-sm rounded-lg">
                <button
                    className="absolute top-0 right-0 p-2 text-gray-600 hover:text-gray-800 focus:outline-none"
                    onClick={onClose}
                >
                    <Icons.X className="w-6 h-6" />
                </button>
                <h3 className="font-bold mb-2 pr-8 text-gray-800">{toilet.Location}</h3>
                <p className="text-gray-700">Male: {toilet.male}</p>
                <p className="text-gray-700">Female: {toilet.female}</p>
                <p className="text-gray-700">Change Facilities: {hasChangeFacilities ? 'Yes' : 'No'}</p>
                {hasChangeFacilities && (
                    <div className="text-sm text-gray-600 ml-4">
                        {toilet.wheelchair.toLowerCase() === 'yes' && <p>- Wheelchair accessible</p>}
                        {toilet.baby_facil.toLowerCase() === 'yes' && <p>- Baby changing facilities</p>}
                    </div>
                )}
                <Button
                    onClick={() => handleCopyLocation(toilet.Location)}
                    className="mt-2 w-full bg-pink-500 hover:bg-pink-600 text-white"
                    variant="outline"
                >
                    <Icons.Copy className="w-4 h-4 mr-2" />
                    Copy Location
                </Button>
                <Button
                    onClick={() => handleGetDirections(toilet.lat, toilet.lon)}
                    className="mt-2 w-full bg-blue-500 hover:bg-blue-600 text-white"
                    variant="outline"
                >
                    <Icons.Navigation className="w-4 h-4 mr-2" />
                    Get Directions
                </Button>
            </div>
        </Popup>
    )
}

export const OpenSpacePopup: React.FC<PopupProps> = ({ item, onClose }) => {
    const space = item as OpenSpaceData
    return (
        <Popup
            latitude={space.latitude}
            longitude={space.longitude}
            anchor="top"
            onClose={onClose}
            closeOnClick={false}
            closeButton={false}
        >
            <div className="p-2 relative bg-white bg-opacity-80 backdrop-filter backdrop-blur-sm rounded-lg">
                <button
                    className="absolute top-0 right-0 p-2 text-gray-600 hover:text-gray-800 focus:outline-none"
                    onClick={onClose}
                >
                    <Icons.X className="w-6 h-6" />
                </button>
                <h3 className="font-bold mb-2 pr-8 text-gray-800">{space.PARK_NAME}</h3>
                <p className="text-gray-700">LGA: {space.LGA}</p>
                <p className="text-gray-700">Category: {space.OS_CATEGORY}</p>
                <Button
                    onClick={() => handleCopyLocation(`${space.latitude}, ${space.longitude}`)}
                    className="mt-2 w-full bg-pink-500 hover:bg-pink-600 text-white"
                    variant="outline"
                >
                    <Icons.Copy className="w-4 h-4 mr-2" />
                    Copy Location
                </Button>
                <Button
                    onClick={() => handleGetDirections(space.latitude, space.longitude)}
                    className="mt-2 w-full bg-blue-500 hover:bg-blue-600 text-white"
                    variant="outline"
                >
                    <Icons.Navigation className="w-4 h-4 mr-2" />
                    Get Directions
                </Button>
            </div>
        </Popup>
    )
}

export const ParkingPopup: React.FC<PopupProps> = ({ item, onClose }) => {
    const parking = item as ParkingData
    const [lat, lon] = parking.geo_point.split(',').map(parseFloat)
    return (
        <Popup
            latitude={lat}
            longitude={lon}
            anchor="top"
            onClose={onClose}
            closeOnClick={false}
            closeButton={false}
        >
            <div className="p-2 relative bg-white bg-opacity-80 backdrop-filter backdrop-blur-sm rounded-lg">
                <button
                    className="absolute top-0 right-0 p-2 text-gray-600 hover:text-gray-800 focus:outline-none"
                    onClick={onClose}
                >
                    <Icons.X className="w-6 h-6" />
                </button>
                <h3 className="font-bold mb-2 pr-8 text-gray-800">{parking.onstreet}</h3>

                {/* <p className="text-gray-700">Restriction: {parking.restriction_display}</p> */}
                {/* <p className="text-gray-700">Time: {parking.time_restrictions_start} - {parking.time_restrictions_finish}</p> */}

                <Button
                    onClick={() => window.location.href='CanIParkHere'}
                    className="mt-2 h-16 w-full bg-yellow-500 hover:bg-yellow-400 text-white"
                    variant="outline"
                >
                    <Icons.Navigation className="w-4 h-4 mr-2" />
                    Can I Park Here?<br />Parking Sign Help
                </Button>

                <Button
                    onClick={() => handleCopyLocation(parking.onstreet)}
                    className="mt-2 w-full bg-pink-500 hover:bg-pink-600 text-white"
                    variant="outline"
                >
                    <Icons.Copy className="w-4 h-4 mr-2" />
                    Copy Location
                </Button>
                <Button
                    onClick={() => handleGetDirections(lat, lon)}
                    className="mt-2 w-full bg-blue-500 hover:bg-blue-600 text-white"
                    variant="outline"
                >
                    <Icons.Navigation className="w-4 h-4 mr-2" />
                    Get Directions
                </Button>
            </div>
        </Popup>
    )
}