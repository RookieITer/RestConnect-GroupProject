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
            className="bg-gray-800 text-white h-screen overflow-hidden"
            initial="expanded"
            animate={isExpanded ? "expanded" : "collapsed"}
            variants={sidebarVariants}
            transition={{ duration: 0.3 }}
        >
            <div className="p-4 flex items-center justify-between">
                {isExpanded && (
                    <div className="flex items-center space-x-2">
                        <Icons.LayoutDashboard className="w-6 h-6" />
                        <span className="text-xl font-semibold">RestConnect</span>
                    </div>
                )}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleSidebar}
                    aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
                    className="text-white hover:bg-gray-700"
                >
                    {isExpanded ? <Icons.ChevronLeft className="w-6 h-6" /> : <Icons.ChevronRight className="w-6 h-6" />}
                </Button>
            </div>
            <nav className="flex flex-col p-4 space-y-4">
                <Link to="/" className="w-full">
                    <Button
                        variant="link"
                        className={`flex items-center justify-start space-x-2 p-2 w-full ${isActive('/') ? 'bg-blue-500' : ''} rounded-md`}
                    >
                        <Icons.LayoutDashboard className="w-6 h-6 text-white" />
                        {isExpanded && <span className="font-semibold text-white">Dashboard</span>}
                    </Button>
                </Link>
                <Link to="/interactive-map" className="w-full">
                    <Button
                        variant="link"
                        className={`flex items-center justify-start space-x-2 p-2 w-full ${isActive('/interactive-map') ? 'bg-blue-500' : ''} rounded-md`}
                    >
                        <Icons.MapPin className="w-6 h-6 text-white" />
                        {isExpanded && <span className="font-semibold text-white">Interactive Map</span>}
                    </Button>
                </Link>
            </nav>
        </motion.aside>
    );
};

export default Sidebar;