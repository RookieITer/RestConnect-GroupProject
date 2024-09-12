import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { FilterState } from '@/utils/types'

interface MapFiltersProps {
    filter: FilterState
    onFilterChange: (key: keyof FilterState['toiletFilters'] | keyof FilterState['openSpaceFilters'] | keyof FilterState['parkingFilters']) => void
    onLocationTypeChange: (value: FilterState['locationType']) => void
}

export const MapFilters: React.FC<MapFiltersProps> = ({ filter, onFilterChange, onLocationTypeChange }) => {
    return (
        <div className="mb-4 flex flex-wrap gap-4">
            <Select onValueChange={onLocationTypeChange}>
                <SelectTrigger className="w-[180px] bg-white bg-opacity-80 backdrop-filter backdrop-blur-sm">
                    <SelectValue placeholder="Select location type" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="toilets">Toilets</SelectItem>
                    <SelectItem value="openSpaces">Open Spaces</SelectItem>
                    <SelectItem value="parking">Parking</SelectItem>
                </SelectContent>
            </Select>

            {filter.locationType === 'toilets' && (
                <div className="flex flex-wrap gap-4">
                    {Object.entries(filter.toiletFilters).map(([key, value]) => (
                        <div key={key} className="flex items-center space-x-2">
                            <Checkbox
                                id={key}
                                checked={value}
                                onCheckedChange={() => onFilterChange(key as keyof FilterState['toiletFilters'])}
                            />
                            <Label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</Label>
                        </div>
                    ))}
                </div>
            )}

            {filter.locationType === 'openSpaces' && (
                <div className="flex flex-wrap gap-4">
                    {Object.entries(filter.openSpaceFilters).map(([key, value]) => (
                        <div key={key} className="flex items-center space-x-2">
                            <Checkbox
                                id={key}
                                checked={value}
                                onCheckedChange={() => onFilterChange(key as keyof FilterState['openSpaceFilters'])}
                            />
                            <Label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</Label>
                        </div>
                    ))}
                </div>
            )}

            {filter.locationType === 'parking' && (
                <div className="flex flex-wrap gap-4">
                    {Object.entries(filter.parkingFilters).map(([key, value]) => (
                        <div key={key} className="flex items-center space-x-2">
                            <Checkbox
                                id={key}
                                checked={value}
                                onCheckedChange={() => onFilterChange(key as keyof FilterState['parkingFilters'])}
                            />
                            <Label htmlFor={key}>{key.split(/(?=[A-Z])/).join(' ')}</Label>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}