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

export interface ApiResponse {
    statusCode: number
    body: string
}

export interface FilterState {
    locationType: 'all' | 'toilets' | 'openSpaces'
    toiletFilters: {
        male: boolean
        female: boolean
        wheelchair: boolean
        babyFacilities: boolean
    }
    openSpaceFilters: {
        melbourne: boolean
        others: boolean
    }
}