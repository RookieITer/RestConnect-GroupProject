import React, { useEffect, useState } from 'react'
import Map, { Marker, Popup } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import axios from 'axios'
import { Button } from "@/components/ui/button"
import { Icons } from '@/components/Icons'

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

interface ApiResponse {
    statusCode: number
    body: string
}

export const InteractiveMap: React.FC = () => {
    const [toilets, setToilets] = useState<ToiletData[]>([])
    const [selectedToilet, setSelectedToilet] = useState<ToiletData | null>(null)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchToilets = async () => {
            try {
                const response = await axios.get<ApiResponse>('https://ug7jfdmytf.execute-api.ap-southeast-2.amazonaws.com/v1/get_public_toilets')
                const parsedBody = JSON.parse(response.data.body)
                const toiletsData = parsedBody.toilets as ToiletData[]

                const validToilets = toiletsData.filter(toilet =>
                    typeof toilet.lat === 'number' && !isNaN(toilet.lat) &&
                    typeof toilet.lon === 'number' && !isNaN(toilet.lon)
                )

                setToilets(validToilets)
            } catch (error) {
                console.error('Error fetching toilet data:', error)
                setError('Failed to load toilet data. Please try again later.')
            }
        }

        fetchToilets()
    }, [])

    const handleCopyLocation = (location: string) => {
        navigator.clipboard.writeText(location).then(() => {
            alert('Location copied to clipboard!')
        }).catch(err => {
            console.error('Failed to copy: ', err)
            setError('Failed to copy location. Please try again.')
        })
    }

    if (error) {
        return <div className="text-red-500">{error}</div>
    }

    return (
        <div className="w-full h-full">
            <h2 className="text-2xl font-bold mb-4">Melbourne Interactive Map</h2>
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
                            key={toilet.Toilet_ID.toString()}
                            latitude={toilet.lat}
                            longitude={toilet.lon}
                            anchor="bottom"
                            onClick={e => {
                                e.originalEvent.stopPropagation()
                                setSelectedToilet(toilet)
                            }}
                        >
                            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                                <Icons.MapPin className="w-4 h-4 text-white" />
                            </div>
                        </Marker>
                    ))}

                    {selectedToilet && (
                        <Popup
                            latitude={selectedToilet.lat}
                            longitude={selectedToilet.lon}
                            anchor="top"
                            onClose={() => setSelectedToilet(null)}
                            closeOnClick={false}
                        >
                            <div className="p-2">
                                <h3 className="font-bold mb-2">{selectedToilet.Location}</h3>
                                <p>Male: {selectedToilet.male}</p>
                                <p>Female: {selectedToilet.female}</p>
                                <p>Wheelchair: {selectedToilet.wheelchair}</p>
                                <p>Baby Facilities: {selectedToilet.baby_facil}</p>
                                <Button
                                    onClick={() => handleCopyLocation(selectedToilet.Location)}
                                    className="mt-2 w-full"
                                    variant="outline"
                                >
                                    <Icons.Copy className="w-4 h-4 mr-2" />
                                    Copy Location
                                </Button>
                            </div>
                        </Popup>
                    )}
                </Map>
            </div>
        </div>
    )
}

export default InteractiveMap