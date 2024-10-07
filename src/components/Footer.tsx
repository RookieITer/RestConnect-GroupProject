import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-[#e6f3ff] text-gray-600 py-8">
            <div className="container mx-auto px-4">
                <div className="flex justify-center mb-8">
                    <Link to="/" className="inline-block">
                        <img
                            src="/Rest&connect_perfect.svg"
                            alt="RestConnect Logo"
                            className="h-16"
                        />
                    </Link>
                </div>
                <div className="flex flex-wrap justify-between">
                    <div className="w-full md:w-1/4 mb-6 md:mb-0">
                        <h2 className="text-lg font-semibold mb-4">RestConnect</h2>
                        <p className="text-sm">Helping gig workers find their perfect rest spots.</p>
                    </div>
                    <div className="w-full md:w-1/4 mb-6 md:mb-0">
                        <h3 className="text-md font-semibold mb-4">Quick Links</h3>
                        <ul className="text-sm">
                            <li className="mb-2"><Link to="/" className="hover:text-blue-500">Home</Link></li>
                            <li className="mb-2"><Link to="/interactive-map" className="hover:text-blue-500">Find
                                Amenities</Link></li>
                            <li className="mb-2"><Link to="/statistics" className="hover:text-blue-500">Know Your
                                Risks</Link></li>
                            <li className="mb-2"><Link to="/caniparkhere" className="hover:text-blue-500">Can I Park
                                Here?</Link></li>
                            <li className="mb-2"><Link to="/supporthub" className="hover:text-blue-500">Support Hub</Link></li>
                        </ul>
                    </div>
                    <div className="w-full md:w-1/4 mb-6 md:mb-0">
                    <Link to="/privacy" className="hover:text-blue-500">Privacy Policy</Link><br /><br />
                    <h3 className="text-md font-semibold mb-4">Contact Us</h3>
                        <p className="text-sm mb-2">Email: info@restconnect.com</p>
                        <p className="text-sm">Phone: (03) 1234 5678</p>
                    </div>
                </div>
                <div className="border-t border-gray-200 mt-8 pt-8 text-sm text-center">
                    <p>&copy; {new Date().getFullYear()} RestConnect. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;