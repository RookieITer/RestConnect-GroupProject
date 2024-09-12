import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
    const [text, setText] = useState('');
    const fullText = "Oops! Looks like you've wandered off the map.";

    useEffect(() => {
        let i = 0;
        const typingEffect = setInterval(() => {
            if (i < fullText.length) {
                setText((prev) => prev + fullText.charAt(i));
                i++;
            } else {
                clearInterval(typingEffect);
            }
        }, 50);

        return () => clearInterval(typingEffect);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-peach-100 p-4">
            <div className="max-w-2xl w-full bg-white rounded-lg shadow-xl overflow-hidden">
                <div className="p-6 sm:p-10">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
                    <p className="text-xl text-gray-600 mb-8 h-16">{text}</p>
                    <div className="relative w-full h-64 sm:h-96 mb-8">
                        <img
                            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/404pageimage-WthBItEXOf8oMXjW78KEnpattnc2ct.png"
                            alt="404 Illustration"
                            className="w-full h-full object-contain animate-float"
                        />
                    </div>
                    <Link
                        to="/"
                        className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                    >
                        Return to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}