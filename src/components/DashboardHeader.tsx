import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

export const DashboardHeader: React.FC = () => {
    const location = useLocation();

    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'Interactive Map', path: '/interactive-map' },
        { name: 'Statistics', path: '/statistics' },
    ];

    return (
        <motion.div
            className="flex items-center justify-between px-6 bg-[#e6f3f5] h-32"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <motion.div
                className="flex items-center h-full"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <img
                    src="/Rest&connect.svg"
                    alt="RestConnect Logo"
                    className="h-full w-auto max-w-none object-contain"
                />
                <span className="sr-only">RestConnect</span>
            </motion.div>
            <nav className="ml-4">
                <ul className="flex space-x-6">
                    {navItems.map((item) => (
                        <li key={item.name}>
                            <Link
                                to={item.path}
                                className={`
                                    text-gray-700 hover:text-gray-900
                                    transition-all duration-300 ease-in-out
                                    text-xl font-medium
                                    px-4 py-2 rounded-full
                                    bg-[#e6f3f5] hover:bg-[#d1e9ec] hover:shadow-lg
                                    hover:scale-110 transform
                                    ${location.pathname === item.path ? 'font-semibold bg-[#d1e9ec]' : ''}
                                    relative
                                    group
                                `}
                            >
                                {item.name}
                                <span className="
                                    absolute inset-0 rounded-full
                                    bg-[#c0e0e4] opacity-0 group-hover:opacity-25
                                    transition-opacity duration-300 ease-in-out
                                    blur-md
                                "></span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </motion.div>
    );
};

export default DashboardHeader;