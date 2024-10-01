export interface ToiletData {
    Toilet_ID: number
    Location: string
    male: string
    female: string
    wheelchair: string
    baby_facil: string
    lat: number
    lon: number
}

export interface OpenSpaceData {
    PARK_NAME: string
    LGA: string
    OS_CATEGORY: string
    latitude: number
    longitude: number
}

export interface ParkingData {
    segment_id: number
    geo_shape: string
    geo_point: string
    str_type: string
    onstreet: string
    parkingzone: string
    restriction_display: string
    day_of_week: string
    time_restrictions_start: string
    time_restrictions_finish: string
}

export interface ApiResponse {
    statusCode: number
    body: string
}

export type LocationType = 'toilets' | 'openSpaces' | 'parking'

export interface FilterState {
    locationTypes: LocationType[]
    toiletFilters: {
        male: boolean
        female: boolean
        changeFacilities: boolean
    }
    openSpaceFilters: {
        melbourne: boolean
        others: boolean
    }
}

export interface LocationTypeOption {
    value: LocationType
    label: string
}

export const locationTypeOptions: LocationTypeOption[] = [
    { value: 'toilets', label: 'Toilets' },
    { value: 'openSpaces', label: 'Open Spaces' },
    { value: 'parking', label: 'Parking' }
]