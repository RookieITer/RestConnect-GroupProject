import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Papa from 'papaparse';

interface SupportService {
    Name: string;
    What: string;
    Who: string;
    Phone: string;
    'Free Call': string;
    Email: string;
    Website: string;
    Monday: string;
    Tuesday: string;
    Wednesday: string;
    Thursday: string;
    Friday: string;
    Saturday: string;
    Sunday: string;
    'Public Holidays': string;
    'Tram routes': string;
    'Bus routes': string;
    'Nearest train station': string;
    address: string;
    [key: string]: string;
}

export default function SupportHub() {
    const [services, setServices] = useState<SupportService[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [displayedServices, setDisplayedServices] = useState<SupportService[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const categories = [
        "Hospital/Emergency",
        "Employment Assistance",
        "Health Services/Pharmacy",
        "Legal/Financial Advice",
        "Counselling and Psychiatric Services",
        "OTHER"
    ];

    useEffect(() => {
        const fetchCSV = async () => {
            try {
                const response = await fetch('/SupportHub.csv');
                const csvText = await response.text();

                Papa.parse<SupportService>(csvText, {
                    header: true,
                    complete: (results) => {
                        setServices(results.data);
                        setLoading(false);
                    },
                    error: (error: Papa.ParseError) => {
                        setError('Error parsing CSV: ' + error.message);
                        setLoading(false);
                    }
                });
            } catch (err) {
                setError('Error fetching CSV: ' + (err instanceof Error ? err.message : String(err)));
                setLoading(false);
            }
        };

        fetchCSV();
    }, []);

    const selectCategory = (category: string) => {
        setSelectedCategory(category);
        let filteredServices: SupportService[];

        if (category === "OTHER") {
            filteredServices = services.filter(service =>
                !Object.entries(service).some(([key, value]) =>
                    key.startsWith('Category') && categories.slice(0, -1).includes(value)
                )
            );
        } else {
            filteredServices = services.filter(service =>
                Object.entries(service).some(([key, value]) =>
                    key.startsWith('Category') && value === category
                )
            );
        }

        const randomServices = getRandomServices(filteredServices, 3);
        setDisplayedServices(randomServices);
    };

    const getRandomServices = (services: SupportService[], count: number) => {
        const shuffled = [...services].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    };

    const renderServiceInfo = (service: SupportService) => {
        const fields = [
            'Name', 'What', 'Who', 'Phone', 'Free Call', 'Email', 'Website',
            'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday',
            'Public Holidays', 'Tram routes', 'Bus routes', 'Nearest train station', 'address'
        ];

        return (
            <Card className="w-full mb-4">
                <CardContent className="p-4">
                    {fields.map(field =>
                            service[field] && (
                                <p key={field} className="text-sm mb-2">
                                    <strong>{field}:</strong> {
                                    field.toLowerCase() === 'website' ?
                                        <a href={service[field].startsWith('http') ? service[field] : `https://${service[field]}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{service[field]}</a> :
                                        service[field]
                                }
                                </p>
                            )
                    )}
                </CardContent>
            </Card>
        );
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (error) {
        return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h1 className="text-4xl font-bold mb-2">Support Hub</h1>
            <p className="text-xl mb-8">Support Resources When You Need It</p>
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
                <h2 className="text-2xl font-semibold mb-4">Need Assistance? Choose below:</h2>
                <div className="flex flex-col space-y-4 mb-8">
                    {categories.map((category, index) => (
                        <Button
                            key={index}
                            className={`w-full py-3 text-lg ${selectedCategory === category ? 'bg-primary text-primary-foreground' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
                            onClick={() => selectCategory(category)}
                        >
                            <span className="whitespace-normal text-left">{category}</span>
                        </Button>
                    ))}
                </div>
                {selectedCategory && (
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold mb-4">{selectedCategory} Services</h3>
                        {displayedServices.map((service, index) => (
                            <div key={index}>
                                {renderServiceInfo(service)}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}