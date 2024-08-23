import { Input } from "@/components/ui/input";
import { HomeIcon, SettingsIcon, MailsIcon } from "@/components/Icons.tsx";

export const DashboardHeader: React.FC = () => {
    return (
        <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2 text-gray-600">
                <HomeIcon className="w-5 h-5" />
                <span>/ Dashboard</span>
            </div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <div className="flex items-center space-x-4">
                <Input type="search" placeholder="Search here" className="p-2 border rounded-md" />
                <SettingsIcon className="w-6 h-6 text-gray-600" />
                <MailsIcon className="w-6 h-6 text-gray-600" />
            </div>
        </div>
    );
};
