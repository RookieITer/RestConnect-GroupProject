import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

export const DashboardHeader: React.FC = () => {
    const location = useLocation();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'Interactive Map', path: '/interactive-map' },
        { name: 'Statistics', path: '/statistics' },
        { name: 'Can I Park Here?', path: '/CanIParkHere' },
    ];

    const mainNavItems = navItems.slice(0, 1);
    const dropdownNavItems = navItems.slice(1);

    return (
        <motion.div
            className="flex items-center justify-between px-6 bg-[#e6f3f5] h-32"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <nav className="mr-4">
                <ul className="flex space-x-6 items-center">
                    {mainNavItems.map((item) => (
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
                    <li className="relative">
                        <button
                            onMouseEnter={() => setIsDropdownOpen(true)}
                            onMouseLeave={() => setIsDropdownOpen(false)}
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className={`
                                text-gray-700 hover:text-gray-900
                                transition-all duration-300 ease-in-out
                                text-xl font-medium
                                px-4 py-2 rounded-full
                                bg-[#e6f3f5] hover:bg-[#d1e9ec] hover:shadow-lg
                                hover:scale-110 transform
                                relative
                                group
                                flex items-center
                            `}
                        >
                            What can you do? <ChevronDown className="ml-2 h-4 w-4" />
                            <span className="
                                absolute inset-0 rounded-full
                                bg-[#c0e0e4] opacity-0 group-hover:opacity-25
                                transition-opacity duration-300 ease-in-out
                                blur-md
                            "></span>
                        </button>
                        <AnimatePresence>
                            {isDropdownOpen && (
                                <motion.ul
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10"
                                    onMouseEnter={() => setIsDropdownOpen(true)}
                                    onMouseLeave={() => setIsDropdownOpen(false)}
                                >
                                    {dropdownNavItems.map((item) => (
                                        <li key={item.name}>
                                            <Link
                                                to={item.path}
                                                className={`
                                                    block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100
                                                    ${location.pathname === item.path ? 'font-semibold bg-gray-100' : ''}
                                                `}
                                                onClick={() => setIsDropdownOpen(false)}
                                            >
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </motion.ul>
                            )}
                        </AnimatePresence>
                    </li>
                </ul>
            </nav>
            <motion.div
                className="flex items-center h-full"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <Link to="/">
                    <img
                        src="/Rest&connect.svg"
                        alt="RestConnect Logo"
                        className="h-full w-auto max-w-none object-contain"
                    />
                    <span className="sr-only">RestConnect</span>
                </Link>
            </motion.div>
        </motion.div>
    );
};

export default DashboardHeader;