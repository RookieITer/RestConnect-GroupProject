import React from 'react'
import { Popup } from 'react-map-gl'
import { Button } from "@/components/ui/button"
import { Icons } from '@/components/Icons'
import { ToiletData, OpenSpaceData } from '@/utils/types'
import { handleCopyLocation } from '@/utils/utils'

interface PopupProps {
    item: ToiletData | OpenSpaceData
    onClose: () => void
}

export const ToiletPopup: React.FC<PopupProps> = ({ item, onClose }) => {
    const toilet = item as ToiletData
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
                <p className="text-gray-700">Wheelchair: {toilet.wheelchair}</p>
                <p className="text-gray-700">Baby Facilities: {toilet.baby_facil}</p>
                <Button
                    onClick={() => handleCopyLocation(toilet.Location)}
                    className="mt-2 w-full bg-pink-500 hover:bg-pink-600 text-white"
                    variant="outline"
                >
                    <Icons.Copy className="w-4 h-4 mr-2" />
                    Copy Location
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
            </div>
        </Popup>
    )
}