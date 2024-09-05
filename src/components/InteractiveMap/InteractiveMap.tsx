import React, { useEffect, useState } from 'react'
import { ToiletData, OpenSpaceData, FilterState } from '@/utils/types'
import { fetchToilets, fetchOpenSpaces } from '@/utils/api'
import { MapFilters } from './MapFilters'
import { MapView } from './MapView'

export const InteractiveMap: React.FC = () => {
    const [toilets, setToilets] = useState<ToiletData[]>([])
    const [openSpaces, setOpenSpaces] = useState<OpenSpaceData[]>([])
    const [selectedItem, setSelectedItem] = useState<ToiletData | OpenSpaceData | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [filter, setFilter] = useState<FilterState>({
        locationType: 'all',
        toiletFilters: {
            male: false,
            female: false,
            wheelchair: false,
            babyFacilities: false
        },
        openSpaceFilters: {
            melbourne: true,
            others: true
        }
    })

    useEffect(() => {
        const loadData = async () => {
            try {
                const [toiletsData, openSpacesData] = await Promise.all([fetchToilets(), fetchOpenSpaces()])
                setToilets(toiletsData.filter(toilet =>
                    typeof toilet.lat === 'number' && !isNaN(toilet.lat) &&
                    typeof toilet.lon === 'number' && !isNaN(toilet.lon)
                ))
                setOpenSpaces(openSpacesData)
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message)
                } else {
                    setError('An unknown error occurred')
                }
            }
        }

        loadData()
    }, [])

    const handleFilterChange = (key: keyof FilterState['toiletFilters'] | keyof FilterState['openSpaceFilters']) => {
        setFilter(prev => ({
            ...prev,
            toiletFilters: key in prev.toiletFilters ? {
                ...prev.toiletFilters,
                [key]: !prev.toiletFilters[key as keyof FilterState['toiletFilters']]
            } : prev.toiletFilters,
            openSpaceFilters: key in prev.openSpaceFilters ? {
                ...prev.openSpaceFilters,
                [key]: !prev.openSpaceFilters[key as keyof FilterState['openSpaceFilters']]
            } : prev.openSpaceFilters
        }))
    }

    const handleLocationTypeChange = (value: FilterState['locationType']) => {
        setFilter(prev => ({ ...prev, locationType: value }))
    }

    if (error) {
        return <div className="text-red-500">{error}</div>
    }

    return (
        <div className="w-full h-full bg-white p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Melbourne Interactive Map</h2>
            <MapFilters
                filter={filter}
                onFilterChange={handleFilterChange}
                onLocationTypeChange={handleLocationTypeChange}
            />
            <MapView
                toilets={toilets}
                openSpaces={openSpaces}
                filter={filter}
                selectedItem={selectedItem}
                onItemSelect={setSelectedItem}
            />
        </div>
    )
}

export default InteractiveMap