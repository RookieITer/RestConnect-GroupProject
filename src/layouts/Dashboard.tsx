import React from 'react';
import { Sidebar } from '@/components/Sidebar';
import { DashboardHeader } from '@/components/DashboardHeader';
import { DashboardMainContent } from '@/components/DashboardMainContent';

const Dashboard: React.FC = () => {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <main className="flex-1 bg-gray-100 p-6">
                <DashboardHeader />
                <DashboardMainContent />
            </main>
        </div>
    );
};

export default Dashboard;
