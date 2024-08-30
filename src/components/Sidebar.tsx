import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/Icons";
import { motion } from "framer-motion";

export const Sidebar: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(true);
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    const toggleSidebar = () => setIsExpanded(!isExpanded);

    const sidebarVariants = {
        expanded: { width: "16rem" },
        collapsed: { width: "4rem" }
    };

    return (
        <motion.aside
            className="bg-gradient-to-br from-pink-200 via-pink-300 to-orange-200 text-gray-800 h-screen overflow-hidden"
            initial="expanded"
            animate={isExpanded ? "expanded" : "collapsed"}
            variants={sidebarVariants}
            transition={{ duration: 0.3 }}
        >
            <div className="p-4 flex items-center justify-between">
                {isExpanded && (
                    <div className="flex items-center space-x-2">
                        <Icons.LayoutDashboard className="w-6 h-6 text-gray-800" />
                        <span className="text-xl font-semibold text-gray-800">RestConnect</span>
                    </div>
                )}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleSidebar}
                    aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
                    className="text-gray-800 hover:bg-pink-400 hover:bg-opacity-50"
                >
                    {isExpanded ? <Icons.ChevronLeft className="w-6 h-6" /> : <Icons.ChevronRight className="w-6 h-6" />}
                </Button>
            </div>
            <nav className="flex flex-col p-4 space-y-4">
                <Link to="/" className="w-full">
                    <Button
                        variant="link"
                        className={`flex items-center justify-start space-x-2 p-2 w-full ${isActive('/') ? 'bg-pink-500 bg-opacity-50' : 'hover:bg-pink-400 hover:bg-opacity-30'} rounded-md`}
                    >
                        <Icons.HomeIcon className="w-6 h-6 text-gray-800" />
                        {isExpanded && <span className="font-semibold text-gray-800">Home Page</span>}
                    </Button>
                </Link>
                <Link to="/interactive-map" className="w-full">
                    <Button
                        variant="link"
                        className={`flex items-center justify-start space-x-2 p-2 w-full ${isActive('/interactive-map') ? 'bg-pink-500 bg-opacity-50' : 'hover:bg-pink-400 hover:bg-opacity-30'} rounded-md`}
                    >
                        <Icons.MapPin className="w-6 h-6 text-gray-800" />
                        {isExpanded && <span className="font-semibold text-gray-800">Interactive Map</span>}
                    </Button>
                </Link>
                <Link to="/statistics" className="w-full">
                    <Button
                        variant="link"
                        className={`flex items-center justify-start space-x-2 p-2 w-full ${isActive('/statistics') ? 'bg-pink-500 bg-opacity-50' : 'hover:bg-pink-400 hover:bg-opacity-30'} rounded-md`}
                    >
                        <Icons.BarChart className="w-6 h-6 text-gray-800" />
                        {isExpanded && <span className="font-semibold text-gray-800">Statistics</span>}
                    </Button>
                </Link>
            </nav>
        </motion.aside>
    );
};

export default Sidebar;