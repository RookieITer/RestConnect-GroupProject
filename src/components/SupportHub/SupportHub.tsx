import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'

interface SupportService {
    Name: string;
    What: string | null;
    Who: string | null;
    Phone: string | null;
    "Free Call": string | null;
    Email: string | null;
    Website: string | null;
    Monday: string | null;
    Tuesday: string | null;
    Wednesday: string | null;
    Thursday: string | null;
    Friday: string | null;
    Saturday: string | null;
    Sunday: string | null;
    "Public Holidays": string | null;
    "Tram routes": string | null;
    "Bus routes": string | null;
    "Nearest train station": string | null;
    "Category 1": string | null;
    Longitude: number | null;
    Latitude: number | null;
    address: string | null;
    Category: string;
}

interface ServiceWithCount extends SupportService {
    nonNullFieldsCount: number;
}

export default function SupportHub() {
    const [services, setServices] = useState<SupportService[]>([])
    const [categories, setCategories] = useState<string[]>([])
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        fetchAllServices()
    }, [])

    const fetchAllServices = async () => {
        setLoading(true)
        setError(null)
        try {
            const response = await fetch('https://ug7jfdmytf.execute-api.ap-southeast-2.amazonaws.com/v1/get_support_service')
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            const data: SupportService[] = await response.json()
            setServices(data)
            const uniqueCategories = Array.from(new Set(data.map(service => service.Category)))
            setCategories(uniqueCategories)
        } catch (error) {
            setError('Failed to fetch services. Please try again.')
            console.error('Error:', error)
        } finally {
            setLoading(false)
        }
    }

    const toggleCategory = (category: string) => {
        setSelectedCategory(selectedCategory === category ? null : category)
    }

    const getTopServicesForCategory = (category: string): SupportService[] => {
        return services
            .filter(service => service.Category === category)
            .map(service => ({
                ...service,
                nonNullFieldsCount: Object.values(service).filter(value => value !== null).length
            }))
            .sort((a, b) => (b as ServiceWithCount).nonNullFieldsCount - (a as ServiceWithCount).nonNullFieldsCount)
            .slice(0, 3)
    }

    const renderServiceInfo = (service: SupportService) => {
        return (
            <div className="space-y-2">
                <h4 className="font-bold text-lg">{service.Name}</h4>
                {Object.entries(service).map(([key, value]) => {
                    if (value && key !== 'Category' && key !== 'Name' && key !== 'Longitude' && key !== 'Latitude') {
                        return (
                            <p key={key} className="text-sm">
                                <strong>{key}:</strong> {key === 'Website' ? (
                                <a href={`https://${value}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{value}</a>
                            ) : value}
                            </p>
                        )
                    }
                    return null
                })}
            </div>
        )
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h1 className="text-4xl font-bold mb-2">Support Hub</h1>
            <p className="text-xl mb-8">Support Resources When You Need It</p>
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
                {loading ? (
                    <p className="text-center">Loading...</p>
                ) : error ? (
                    <p className="text-center text-red-500">{error}</p>
                ) : (
                    <>
                        <h2 className="text-2xl font-semibold mb-4">Need Assistance? Choose below:</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                            {categories.map((category, index) => (
                                <Button
                                    key={index}
                                    className={`w-full py-3 text-lg ${selectedCategory === category ? 'bg-primary text-primary-foreground' : ''}`}
                                    onClick={() => toggleCategory(category)}
                                >
                                    {category}
                                </Button>
                            ))}
                        </div>
                        {selectedCategory && (
                            <div className="space-y-6">
                                <h3 className="text-xl font-semibold mb-4">{selectedCategory} Services</h3>
                                {getTopServicesForCategory(selectedCategory).map((service, index) => (
                                    <div key={index} className="border p-4 rounded-lg">
                                        {renderServiceInfo(service)}
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}