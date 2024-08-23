import { Card } from "@/components/ui/card";
import { BookAIcon, UsersIcon, ReceiptIcon, LinechartChart } from "@/components/Icons.tsx";  // 导入图标

export const DashboardMainContent: React.FC = () => {
    return (
        <>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
                <Card className="bg-white p-4 rounded-md shadow-md">
                    <div className="flex items-center justify-between mb-2">
                        <BookAIcon className="w-6 h-6 bg-black text-white p-2 rounded-md" />
                        <span>Bookings</span>
                    </div>
                    <div className="text-2xl font-bold">281</div>
                    <div className="text-green-500">+55% than last week</div>
                </Card>
                <Card className="bg-white p-4 rounded-md shadow-md">
                    <div className="flex items-center justify-between mb-2">
                        <UsersIcon className="w-6 h-6 bg-blue-500 text-white p-2 rounded-md" />
                        <span>Today's Users</span>
                    </div>
                    <div className="text-2xl font-bold">2,300</div>
                    <div className="text-green-500">+3% than last month</div>
                </Card>
                <Card className="bg-white p-4 rounded-md shadow-md">
                    <div className="flex items-center justify-between mb-2">
                        <ReceiptIcon className="w-6 h-6 bg-green-500 text-white p-2 rounded-md" />
                        <span>Revenue</span>
                    </div>
                    <div className="text-2xl font-bold">34k</div>
                    <div className="text-green-500">+1% than yesterday</div>
                </Card>
                <Card className="bg-white p-4 rounded-md shadow-md">
                    <div className="flex items-center justify-between mb-2">
                        <UsersIcon className="w-6 h-6 bg-pink-500 text-white p-2 rounded-md" />
                        <span>Followers</span>
                    </div>
                    <div className="text-2xl font-bold">+91</div>
                    <div className="text-gray-500">Just updated</div>
                </Card>
            </div>
            <div className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-3">
                <Card className="bg-white p-4 rounded-md shadow-md">
                    <LinechartChart className="w-full aspect-[16/9]" />
                    <div className="mt-4">
                        <h2 className="text-lg font-bold">Website Views</h2>
                        <p className="text-gray-500">Last Campaign Performance</p>
                        <p className="text-gray-500">campaign sent 2 days ago</p>
                    </div>
                </Card>
                <Card className="bg-white p-4 rounded-md shadow-md">
                    <LinechartChart className="w-full h-40" />
                    <div className="mt-4">
                        <h2 className="text-lg font-bold">Daily Sales</h2>
                        <p className="text-gray-500">(+15%) increase in today sales.</p>
                        <p className="text-gray-500">updated 4 min ago</p>
                    </div>
                </Card>
                <Card className="bg-white p-4 rounded-md shadow-md">
                    <LinechartChart className="w-full h-40" />
                    <div className="mt-4">
                        <h2 className="text-lg font-bold">Completed Tasks</h2>
                        <p className="text-gray-500">Last Campaign Performance</p>
                        <p className="text-gray-500">just updated</p>
                    </div>
                </Card>
            </div>
            <div className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-2">
                <Card className="bg-white p-4 rounded-md shadow-md">
                    <h2 className="text-lg font-bold">Projects</h2>
                    <p className="text-gray-500">30 done this month</p>
                </Card>
                <Card className="bg-white p-4 rounded-md shadow-md">
                    <h2 className="text-lg font-bold">Orders overview</h2>
                    <p className="text-green-500">↑ 24% this month</p>
                </Card>
            </div>
        </>
    );
};
