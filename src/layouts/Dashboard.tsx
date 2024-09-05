import React from 'react';
import { DashboardHeader } from '@/components/DashboardHeader';
import { DashboardMainContent } from '@/components/DashboardMainContent';
import { Routes, Route } from 'react-router-dom';
import { InteractiveMap } from '@/components/InteractiveMap/InteractiveMap';
import Statistics from "@/components/Statistics";

const Dashboard: React.FC = () => {
    return (
        <div className="flex flex-col h-screen bg-white">
            <DashboardHeader />
            <div className="flex-1 overflow-auto">
                <Routes>
                    <Route index element={<DashboardMainContent />} />
                    <Route path="interactive-map" element={<InteractiveMap />} />
                    <Route path="statistics" element={<Statistics />} />
                    {/* Add other routes as needed */}
                </Routes>
            </div>
        </div>
    );
};

export default Dashboard;