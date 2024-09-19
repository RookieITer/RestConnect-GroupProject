'use client'

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export const DashboardHeader: React.FC = () => {
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'Find the Nearest Amenities', path: '/interactive-map' },
        { name: 'Know your risks', path: '/statistics' },
        { name: 'Can I Park Here?', path: '/CanIParkHere' },
    ];

    return (
        <motion.div
            className="flex items-center justify-between px-4 lg:px-6 bg-[#e6f3ff] h-16 sm:h-20 md:h-24 lg:h-28"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <div className="flex items-center lg:hidden">
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="text-gray-700 hover:text-gray-900 mr-4"
                    aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>
            <nav className="hidden lg:block">
                <ul className="flex space-x-4 items-center">
                    {navItems.map((item) => (
                        <li key={item.name}>
                            <Link
                                to={item.path}
                                className={`
                                    text-gray-700 hover:text-gray-900
                                    transition-all duration-300 ease-in-out
                                    text-sm xl:text-base font-medium
                                    px-2 py-1 xl:px-3 xl:py-2 rounded-full
                                    bg-[#e6f3ff] hover:bg-[#d1e9ec] hover:shadow-lg
                                    hover:scale-110 transform
                                    ${location.pathname === item.path ? 'font-semibold bg-[#d1e9ec] text-gray-900 shadow-lg' : ''}
                                    relative
                                    group
                                `}
                            >
                                {item.name}
                                <span className={`
                                    absolute inset-0 rounded-full
                                    bg-[#c0e0e4] opacity-0 group-hover:opacity-25
                                    transition-opacity duration-300 ease-in-out
                                    blur-md
                                    ${location.pathname === item.path ? 'opacity-25' : ''}
                                `}></span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
            <motion.div
                className="flex items-center justify-end flex-grow lg:flex-grow-0"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <Link to="/">
                    <img
                        src="/Rest&connect_perfect.svg"
                        alt="RestConnect Logo"
                        className="h-24"
                    />
                    <span className="sr-only">RestConnect</span>
                </Link>
            </motion.div>
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-16 sm:top-20 md:top-24 left-0 right-0 bg-[#e6f3ff] shadow-lg z-20 lg:hidden"
                    >
                        <ul className="py-2">
                            {navItems.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        to={item.path}
                                        className={`
                                            block px-4 py-2 text-sm text-gray-700 hover:bg-[#d1e9ec]
                                            ${location.pathname === item.path ? 'font-semibold bg-[#d1e9ec] text-gray-900' : ''}
                                        `}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default DashboardHeader;