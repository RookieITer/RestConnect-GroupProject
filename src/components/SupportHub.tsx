import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'

interface SupportService {
    category: string;
    name: string;
    description: string;
    contact: string;
}

export default function SupportHub() {
    const [categories, setCategories] = useState<string[]>([])
    const [services, setServices] = useState<Record<string, SupportService[]>>({})
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)
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

            // Categorize services
            const categorizedServices: Record<string, SupportService[]> = {}
            data.forEach(service => {
                if (!categorizedServices[service.category]) {
                    categorizedServices[service.category] = []
                }
                categorizedServices[service.category].push(service)
            })

            setCategories(Object.keys(categorizedServices))
            setServices(categorizedServices)
        } catch (error) {
            setError('Failed to fetch services. Please try again.')
            console.error('Error:', error)
        } finally {
            setLoading(false)
        }
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
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                            {categories.map((category, index) => (
                                <Button
                                    key={index}
                                    className="w-full py-3 text-lg"
                                    onClick={() => setSelectedCategory(category)}
                                >
                                    {category}
                                </Button>
                            ))}
                        </div>
                        {selectedCategory && (
                            <div>
                                <h3 className="text-xl font-semibold mb-4">{selectedCategory} Services</h3>
                                <ul className="space-y-4">
                                    {services[selectedCategory].map((service, index) => (
                                        <li key={index} className="border p-4 rounded-lg">
                                            <h4 className="font-bold">{service.name}</h4>
                                            <p>{service.description}</p>
                                            <p className="mt-2"><strong>Contact:</strong> {service.contact}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}