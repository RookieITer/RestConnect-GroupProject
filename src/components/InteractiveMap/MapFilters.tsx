import React from 'react'
import { FilterState, LocationType } from '@/utils/types'
import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react"
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { LocationTypeFilter } from './LocationTypeFilter'
import { Selection } from "@nextui-org/react"

interface MapFiltersProps {
    filter: FilterState
    onFilterChange: (category: string, options: string[]) => void
    onLocationTypeChange: (types: LocationType[]) => void
}

export const MapFilters: React.FC<MapFiltersProps> = ({ filter, onFilterChange, onLocationTypeChange }) => {
    const toiletOptions = [
        { key: 'male', label: 'Male' },
        { key: 'female', label: 'Female' },
        { key: 'changeFacilities', label: 'Change Facilities' },
    ]

    const openSpaceOptions = [
        { key: 'melbourne', label: 'Melbourne' },
        { key: 'others', label: 'Others' },
    ]

    const handleSubcategoryChange = (category: string, keys: Selection) => {
        onFilterChange(category, Array.from(keys) as string[])
    }

    const dropdownStyles = {
        backgroundColor: 'white',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
    }

    return (
        <div className="mb-1 mt-4 flex flex-wrap gap-1">
            <LocationTypeFilter
                selectedTypes={filter.locationTypes}
                onChange={onLocationTypeChange}
            />

            {filter.locationTypes.includes('toilets') && (
                <Dropdown>
                    <DropdownTrigger>
                        <Button
                            variant="flat"
                            className="capitalize bg-black text-white"
                            endContent={<ChevronDownIcon className="h-4 w-4 text-white" />}
                        >
                            Toilet Facilities
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                        aria-label="Toilet Facilities"
                        selectionMode="multiple"
                        selectedKeys={new Set(Object.entries(filter.toiletFilters)
                            .filter(([, value]) => value)
                            .map(([key]) => key))}
                        onSelectionChange={(keys) => handleSubcategoryChange('toiletFilters', keys)}
                        className="bg-black text-white"
                        style={dropdownStyles}
                    >
                        {toiletOptions.map((option) => (
                            <DropdownItem key={option.key} className="bg-black hover:bg-black text-white">
                                {option.label}
                            </DropdownItem>
                        ))}
                    </DropdownMenu>
                </Dropdown>
            )}

            {filter.locationTypes.includes('openSpaces') && (
                <Dropdown>
                    <DropdownTrigger>
                        <Button
                            variant="flat"
                            className="capitalize bg-green-400"
                            endContent={<ChevronDownIcon className="h-4 w-4" />}
                        >
                            Rest Spot
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                        aria-label="Rest Spot"
                        selectionMode="multiple"
                        selectedKeys={new Set(Object.entries(filter.openSpaceFilters)
                            .filter(([, value]) => value)
                            .map(([key]) => key))}
                        onSelectionChange={(keys) => handleSubcategoryChange('openSpaceFilters', keys)}
                        className="bg-green-400"
                        style={dropdownStyles}
                    >
                        {openSpaceOptions.map((option) => (
                            <DropdownItem key={option.key} className="bg-green-400 hover:bg-green-400">
                                {option.label}
                            </DropdownItem>
                        ))}
                    </DropdownMenu>
                </Dropdown>
            )}

            {filter.locationTypes.includes('parking') && (
                <Button onClick={() => window.location.href='CanIParkHere'} className="bg-yellow-300">
                    Can I Park Here?
                </Button>
            )}
        </div>
    )
}