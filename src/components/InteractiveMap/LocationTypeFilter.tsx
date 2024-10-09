import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react"
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { LocationType, locationTypeOptions } from "@/utils/types"
import { Selection } from "@nextui-org/react"

interface LocationTypeFilterProps {
    selectedTypes: LocationType[]
    onChange: (types: LocationType[]) => void
}

export function LocationTypeFilter({ selectedTypes, onChange }: LocationTypeFilterProps) {
    const handleSelectionChange = (keys: Selection) => {
        onChange(Array.from(keys) as LocationType[])
    }

    const dropdownStyles = {
        backgroundColor: 'white',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
    }

    return (
        <Dropdown>
            <DropdownTrigger>
                <Button
                    variant="flat"
                    className={`capitalize ${selectedTypes.length > 0 ? 'bg-blue-400 text-white pr-2 pl-2' : 'bg-blue-400 text-white pr-2 pl-2'}`}
                    endContent={<ChevronDownIcon className={`h-4 w-4 ${selectedTypes.length > 0 ? 'text-white' : 'text-black'}`} />}
                >
                    {selectedTypes.length > 0
                        ? `Selected Amenities `
                        : "Select Amenities"}
                </Button>
            </DropdownTrigger>
            <DropdownMenu
                aria-label="Location Types"
                selectionMode="multiple"
                selectedKeys={new Set(selectedTypes)}
                onSelectionChange={handleSelectionChange}
                className="bg-blue-400"
                style={dropdownStyles}
            >
                {locationTypeOptions.map((type) => (
                    <DropdownItem key={type.value} className="bg-blue-400 hover:bg-blue-500 text-white pr-2 pl-2">
                        {type.label}
                    </DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    )
}