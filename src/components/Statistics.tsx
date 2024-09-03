import React from 'react';
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis } from 'recharts';

export const Statistics: React.FC = () => {
    const barData = [
        { name: 'Jan', sales: 12 },
        { name: 'Feb', sales: 19 },
        { name: 'Mar', sales: 3 },
        { name: 'Apr', sales: 5 },
        { name: 'May', sales: 2 },
        { name: 'Jun', sales: 3 },
    ];

    const lineData = [
        { name: 'Jan', revenue: 65 },
        { name: 'Feb', revenue: 59 },
        { name: 'Mar', revenue: 80 },
        { name: 'Apr', revenue: 81 },
        { name: 'May', revenue: 56 },
        { name: 'Jun', revenue: 55 },
    ];



    const chartConfig = {
        sales: {
            label: 'Sales',
            color: 'hsl(var(--chart-1))',
        },
        revenue: {
            label: 'Revenue',
            color: 'hsl(var(--chart-2))',
        },
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-200 via-pink-300 to-orange-200 text-gray-800 overflow-auto p-8">
            <h1 className="text-4xl font-bold mb-8 text-center">Statistics</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold mb-4">Bar Chart</h2>
                    <ChartContainer className="w-full aspect-[4/3]" config={chartConfig}>
                        <BarChart data={barData}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Bar dataKey="sales" fill="var(--color-sales)" radius={[4, 4, 0, 0]} />
                            <ChartTooltip content={<ChartTooltipContent />} />
                        </BarChart>
                    </ChartContainer>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold mb-4">Line Chart</h2>
                    <ChartContainer className="w-full aspect-[4/3]" config={chartConfig}>
                        <LineChart data={lineData}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Line type="monotone" dataKey="revenue" stroke="var(--color-revenue)" strokeWidth={2} dot={{ fill: "var(--color-revenue)" }} />
                            <ChartTooltip content={<ChartTooltipContent />} />
                        </LineChart>
                    </ChartContainer>
                </div>
            </div>
        </div>
    );
};

export default Statistics;