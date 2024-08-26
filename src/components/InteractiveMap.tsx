import React, { useEffect, useState } from 'react'
import Map, { Marker, Popup } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import axios from 'axios'

interface ToiletData {
    Toilet_ID: number
    Location: string
    male: string
    female: string
    wheelchair: string
    baby_facil: string
    lat: number
    lon: number
}

export const InteractiveMap: React.FC = () => {
    const [toilets, setToilets] = useState<ToiletData[]>([])
    const [selectedToilet, setSelectedToilet] = useState<ToiletData | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchToilets = async () => {
            setIsLoading(true)
            setError(null)
            try {
                const response = await axios.get('https://ug7jfdmytf.execute-api.ap-southeast-2.amazonaws.com/v1/get_public_toilets')
                console.log('API Response:', response.data) // Log the entire response
                if (Array.isArray(response.data)) {
                    setToilets(response.data)
                } else {
                    setError('Data received is not an array')
                }
            } catch (error) {
                console.error('Error fetching toilet data:', error)
                setError('Failed to fetch toilet data')
            } finally {
                setIsLoading(false)
            }
        }

        fetchToilets()
    }, [])

    useEffect(() => {
        console.log('Toilets state updated:', toilets) // Log the toilets state whenever it changes
    }, [toilets])

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error: {error}</div>
    }

    return (
        <div className="w-full h-full">
            <h2 className="text-2xl font-bold mb-4">Melbourne Public Toilets</h2>
            <div className="mb-4">
                <p>Total toilets loaded: {toilets.length}</p>
                <button onClick={() => console.log('Current toilets data:', toilets)} className="bg-blue-500 text-white px-4 py-2 rounded">
                    Log Toilets Data
                </button>
            </div>
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
                    {toilets.map((toilet) => (
                        <Marker
                            key={toilet.Toilet_ID}
                            latitude={toilet.lat}
                            longitude={toilet.lon}
                            anchor="bottom"
                            onClick={e => {
                                e.originalEvent.stopPropagation()
                                setSelectedToilet(toilet)
                                console.log('Selected toilet:', toilet) // Log the selected toilet
                            }}
                        >
                            <img src="/toilet-icon.png" alt="Toilet" className="w-6 h-6" />
                        </Marker>
                    ))}

                    {selectedToilet && (
                        <Popup
                            latitude={selectedToilet.lat}
                            longitude={selectedToilet.lon}
                            anchor="top"
                            onClose={() => setSelectedToilet(null)}
                        >
                            <div>
                                <h3 className="font-bold">{selectedToilet.Location}</h3>
                                <p>Male: {selectedToilet.male}</p>
                                <p>Female: {selectedToilet.female}</p>
                                <p>Wheelchair: {selectedToilet.wheelchair}</p>
                                <p>Baby Facilities: {selectedToilet.baby_facil}</p>
                            </div>
                        </Popup>
                    )}
                </Map>
            </div>
        </div>
    )
}

export default InteractiveMap