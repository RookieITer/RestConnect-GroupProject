'use client'

import React, { useEffect, useState, useCallback } from 'react'
import { ToiletData, OpenSpaceData, ParkingData, FilterState, LocationType } from '@/utils/types'
import { fetchToilets, fetchOpenSpaces, fetchParkingData } from '@/utils/api'
import { MapFilters } from './MapFilters'
import { MapView } from './MapView'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import ErrorBoundary from '@/components/ErrorBoundary'
//import { Card, CardContent } from "@/components/ui/card"
import { Heading, Button } from '@aws-amplify/ui-react'; 
import { useNavigate } from 'react-router-dom';

export const InteractiveMap: React.FC = () => {
    const [toilets, setToilets] = useState<ToiletData[]>([])
    const [openSpaces, setOpenSpaces] = useState<OpenSpaceData[]>([])
    const [parkingSpaces, setParkingSpaces] = useState<ParkingData[]>([])
    const [selectedItem, setSelectedItem] = useState<ToiletData | OpenSpaceData | ParkingData | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isLoadingOpenSpaces, setIsLoadingOpenSpaces] = useState(false)

    const navigate = useNavigate();

    const [filter, setFilter] = useState<FilterState>({
        locationTypes: ['toilets'],
        toiletFilters: {
            male: false,
            female: false,
            changeFacilities: false
        },
        openSpaceFilters: {
            melbourne: true,
            others: true
        }
    })

    const loadInitialData = useCallback(async () => {
        setIsLoading(true)
        setError(null)
        try {
            const [toiletsData, parkingData] = await Promise.all([
                fetchToilets(),
                fetchParkingData()
            ])
            setToilets(toiletsData.filter(toilet =>
                typeof toilet.lat === 'number' && !isNaN(toilet.lat) &&
                typeof toilet.lon === 'number' && !isNaN(toilet.lon)
            ))
            setParkingSpaces(parkingData)
        } catch (error) {
            console.error('Error loading initial data:', error)
            setError('Failed to load initial map data. Please try again later.')
        } finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        loadInitialData()
    }, [loadInitialData])

    const loadOpenSpaces = useCallback(async () => {
        if (openSpaces.length > 0) return
        setIsLoadingOpenSpaces(true)
        setError(null)
        try {
            const openSpacesData = await fetchOpenSpaces()
            setOpenSpaces(openSpacesData)
        } catch (error) {
            console.error('Error loading open spaces data:', error)
            setError('Failed to load open spaces data. Please try again later.')
        } finally {
            setIsLoadingOpenSpaces(false)
        }
    }, [openSpaces.length])

    const handleFilterChange = useCallback((category: string, options: string[]) => {
        setFilter(prev => ({
            ...prev,
            [category]: Object.fromEntries(
                Object.entries(prev[category as keyof FilterState]).map(([key]) => [key, options.includes(key)])
            )
        }))
    }, [])


    // handles button click event to go statistics page
    const handleClick = () => {
        navigate('/statistics');
    }


    const handleLocationTypeChange = useCallback((types: LocationType[]) => {
        setFilter(prev => ({ ...prev, locationTypes: types }))
        if (types.includes('openSpaces') && openSpaces.length === 0) {
            void loadOpenSpaces()
        }
    }, [loadOpenSpaces, openSpaces.length])

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">Loading map data...</div>
    }

    return (
        <ErrorBoundary>
        <div className="min-h-screen bg-white text-gray-800 overflow-auto p-4">
            <div className="container mx-auto px-0 py-0 sm:py-2 md:py-4">
                <div className="flex justify-between items-center">
                    <Heading level={3}>Find the nearest rest areas and amenities</Heading>
                    <div className='pseudoheading hideonmobile'>RestConnect Risk Score for this area: 3.4</div>
                </div>


                <div className="flex justify-between items-center mb-4">
                    {error && (
                        <Alert variant="destructive" className="mb-4">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                    <MapFilters
                        filter={filter}
                        onFilterChange={handleFilterChange}
                        onLocationTypeChange={handleLocationTypeChange}
                    />

                    <Button 
                        onClick={handleClick}
                        variation="primary" className='btnmaxtallthin'>
                            Click Here To Know Your Risks
                    </Button>
                </div>


                <div className=" bg-white p-3 rounded-lg border border-gray-200">
              
                    <MapView
                        toilets={toilets}
                        openSpaces={openSpaces}
                        parkingSpaces={parkingSpaces}
                        filter={filter}
                        selectedItem={selectedItem}
                        onItemSelect={setSelectedItem}
                        isLoadingOpenSpaces={isLoadingOpenSpaces}
                    />
                </div>



            </div>
        </div>
        </ErrorBoundary>
    )
}

export default InteractiveMap