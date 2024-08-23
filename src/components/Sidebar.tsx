import { Button } from "@/components/ui/button";
import {
    LayoutDashboardIcon,
    TableIcon,
    MailsIcon,
    UsersIcon,
} from "@/components/Icons.tsx"; // load icon

export const Sidebar: React.FC = () => {
    return (
        <aside className="w-64 bg-gray-800 text-white">
            <div className="p-4">
                <div className="flex items-center space-x-2">
                    <LayoutDashboardIcon className="w-6 h-6" />
                    <span className="text-xl font-semibold">Material Dashboard 2</span>
                </div>
            </div>
            <nav className="flex flex-col p-4 space-y-4">
                <Button variant="link" className="flex items-center space-x-2 p-2 bg-blue-500 rounded-md">
                    <LayoutDashboardIcon className="w-6 h-6" />
                    <span>Dashboard</span>
                </Button>
                <Button variant="link" className="flex items-center space-x-2 p-2">
                    <TableIcon className="w-6 h-6" />
                    <span>Tables</span>
                </Button>
                <Button variant="link" className="flex items-center space-x-2 p-2">
                    <MailsIcon className="w-6 h-6" />
                    <span>Notifications</span>
                </Button>
                <Button variant="link" className="flex items-center space-x-2 p-2">
                    <UsersIcon className="w-6 h-6" />
                    <span>Profile</span>
                </Button>

            </nav>
            <div className="p-4">
                <Button className="w-full bg-blue-500">UPGRADE TO PRO</Button>
            </div>
        </aside>
    );
};
