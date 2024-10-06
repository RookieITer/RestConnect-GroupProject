import React from 'react';
import { DashboardHeader } from '@/components/DashboardHeader';
import { DashboardMainContent } from '@/components/DashboardMainContent';
import { Routes, Route } from 'react-router-dom';
import { InteractiveMap } from '@/components/InteractiveMap/InteractiveMap';
import CanIParkHere from '@/components/CanIParkHere';
import Statistics from "@/components/Statistics";
import ExternalLinkPage from '@/components/ExternalLinkPage';
import NotFound from '@/components/NotFound';
import Footer from '@/components/Footer';
import SupportHub from "@/components/SupportHub.tsx";

const Dashboard: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen bg-white">
            <DashboardHeader />
            <div className="flex-1 overflow-auto">
                <Routes>
                    <Route index element={<DashboardMainContent />} />
                    <Route path="interactive-map" element={<InteractiveMap />} />
                    <Route path="statistics" element={<Statistics />} />
                    <Route path="caniparkhere" element={<CanIParkHere/>} />
                    <Route path="supporthub" element={<SupportHub/>} />
                    <Route path="rest-areas-and-amenities" element={<ExternalLinkPage url="https://www.abc.net.au/news/2023-09-10/delivery-riders-gig-worker-hub-melbourne-refuge/102829374" title="Rest Areas and Amenities" />} />
                    <Route path="safe-rest-areas" element={<ExternalLinkPage url="https://www.cbdnews.com.au/a-safe-place-for-gig-workers-launches-in-the-cbd/" title="Safe Rest Areas" />} />
                    <Route path="parking" element={<ExternalLinkPage url="https://www.centreforwhs.nsw.gov.au/__data/assets/pdf_file/0007/932677/Work-health-and-safety-of-food-delivery-workers-in-the-gig-economy..pdf" title="Parking Information" />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
            <Footer />
        </div>
    );
};

export default Dashboard;