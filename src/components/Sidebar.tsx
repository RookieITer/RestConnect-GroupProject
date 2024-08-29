import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/Icons";

export const Sidebar: React.FC = () => {
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    return (
        <aside className="w-64 bg-gray-800 text-white">
            <div className="p-4">
                <div className="flex items-center space-x-2">
                    <Icons.LayoutDashboard className="w-6 h-6" />
                    <span className="text-xl font-semibold">RestConnect SideBar</span>
                </div>
            </div>
            <nav className="flex flex-col p-4 space-y-4">
                <Link to="/" className="w-full">
                    <Button
                        variant="link"
                        className={`flex items-center justify-start space-x-2 p-2 w-full ${isActive('/') ? 'bg-blue-500' : ''} rounded-md`}
                    >
                        <Icons.LayoutDashboard className="w-6 h-6 text-white" />
                        <span className="font-semibold text-white">Dashboard</span>
                    </Button>
                </Link>
                <Link to="/interactive-map" className="w-full">
                    <Button
                        variant="link"
                        className={`flex items-center justify-start space-x-2 p-2 w-full ${isActive('/interactive-map') ? 'bg-blue-500' : ''} rounded-md`}
                    >
                        <Icons.MapPin className="w-6 h-6 text-white" />
                        <span className="font-semibold text-white">Interactive Map</span>
                    </Button>
                </Link>
            </nav>
        </aside>
    );
};