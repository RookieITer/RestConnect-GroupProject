import axios from 'axios'
import { ApiResponse, ToiletData, OpenSpaceData } from './types'

export const fetchToilets = async (): Promise<ToiletData[]> => {
    try {
        const response = await axios.get<ApiResponse>('https://ug7jfdmytf.execute-api.ap-southeast-2.amazonaws.com/v1/get_public_toilets')
        const parsedBody = JSON.parse(response.data.body)
        return parsedBody.toilets as ToiletData[]
    } catch (error) {
        console.error('Error fetching toilet data:', error)
        throw new Error('Failed to load toilet data. Please try again later.')
    }
}

export const fetchOpenSpaces = async (): Promise<OpenSpaceData[]> => {
    try {
        const response = await axios.get<ApiResponse>('https://ug7jfdmytf.execute-api.ap-southeast-2.amazonaws.com/v1/get_open_spaces')
        const parsedBody = JSON.parse(response.data.body)
        return parsedBody.open_spaces as OpenSpaceData[]
    } catch (error) {
        console.error('Error fetching open spaces data:', error)
        throw new Error('Failed to load open spaces data. Please try again later.')
    }
}