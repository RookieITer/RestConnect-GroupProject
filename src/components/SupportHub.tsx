import { Button } from '@/components/ui/button'

const supportOptions = [
    'Hospital/Emergency',
    'Employment Assistance',
    'Health Services/Pharmacy',
    'Legal/Financial Advice',
    'Counselling and Psychiatric Services',
    'OTHER'
]

export default function SupportHub() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-2">Support Hub</h1>
            <p className="text-xl mb-8">Support Resources When You Need It</p>
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-4">Need Assistance? Choose below:</h2>
                <div className="space-y-4">
                    {supportOptions.map((option, index) => (
                        <Button key={index} className="w-full py-3 text-lg">
                            {option}
                        </Button>
                    ))}
                </div>
            </div>
        </div>
    )
}