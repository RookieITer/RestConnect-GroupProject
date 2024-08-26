import React from 'react';
import { Sidebar } from '@/components/Sidebar';
import { DashboardHeader } from '@/components/DashboardHeader';
import { DashboardMainContent } from '@/components/DashboardMainContent';
import { Routes, Route } from 'react-router-dom';
import { InteractiveMap } from '../components/InteractiveMap';

const Dashboard: React.FC = () => {
    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <DashboardHeader />
                <div className="flex-1 overflow-auto">
                    <Routes>
                        <Route path="/" element={<DashboardMainContent />} />
                        <Route path="/interactive-map" element={<InteractiveMap />} />
                        {/* Add other routes as needed */}
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
