import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

interface ExternalLinkPageProps {
    url: string;
    title: string;
}

const ExternalLinkPage: React.FC<ExternalLinkPageProps> = ({ url, title }) => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    const handleOpenLink = () => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="min-h-screen bg-white text-gray-800 flex flex-col items-center justify-center p-4">
            <h1 className="text-3xl font-bold mb-6 text-center">{title}</h1>
            <p className="text-lg mb-8 text-center">You're about to visit an external website. Click the button below to open it in a new tab.</p>
            <div className="flex flex-col sm:flex-row gap-4">
                <Button onClick={handleOpenLink} size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-md">
                    Open External Link
                </Button>
                <Button onClick={handleGoBack} size="lg" variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-100 font-medium px-6 py-3 rounded-md">
                    Go Back
                </Button>
            </div>
        </div>
    );
};

export default ExternalLinkPage;