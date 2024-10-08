'use client'

import React, { useEffect, useState, useCallback } from 'react'
import { ToiletData, OpenSpaceData, ParkingData, FilterState, LocationType } from '@/utils/types'
import { fetchToilets, fetchOpenSpaces, fetchParkingData } from '@/utils/api'
import { MapFilters } from './MapFilters'
import { MapView } from './MapView'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import ErrorBoundary from '@/components/ErrorBoundary'
import { Card, CardContent } from "@/components/ui/card"

export const InteractiveMap: React.FC = () => {
    const [toilets, setToilets] = useState<ToiletData[]>([])
    const [openSpaces, setOpenSpaces] = useState<OpenSpaceData[]>([])
    const [parkingSpaces, setParkingSpaces] = useState<ParkingData[]>([])
    const [selectedItem, setSelectedItem] = useState<ToiletData | OpenSpaceData | ParkingData | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isLoadingOpenSpaces, setIsLoadingOpenSpaces] = useState(false)
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
            <div className="min-h-screen bg-white text-gray-800 overflow-auto font-sans">
                <div className="container mx-auto px-4 py-6 sm:py-8 md:py-10">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-bold">Find the nearest rest areas and amenities</h1>
                        <Card className="w-64">
                            <CardContent className="p-4">
                                <h2 className="text-3xl font-bold text-center text-primary">3.4</h2>
                                <p className="text-sm text-center text-muted-foreground">RestConnect Risk Score</p>
                                <p className="text-sm text-center">
                                    Current Location has: Moderate Risk.
                                    <a href="/statistics" className="text-primary hover:underline ml-1 text-red-400 font-bold">
                                        Click here to Know your risks
                                    </a>
                                </p>
                            </CardContent>
                        </Card>
                    </div>
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
        </ErrorBoundary>
    )
}

export default InteractiveMap