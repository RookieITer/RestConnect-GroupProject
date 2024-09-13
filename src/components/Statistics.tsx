'use client'

import { Heading } from '@aws-amplify/ui-react'; 

import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CrimeData {
    LGA: string;
    Crimes_against_the_person: number;
    Property_and_deception_offences: number;
    Drug_offences: number;
    Public_order_and_security_offences: number;
    Justice_procedures_offences: number;
    Other_offences: number;
    Safety_Index: number;
}

interface CustomizedLabelProps {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    percent: number;
}

export default function Statistics() {
    const [crimeData, setCrimeData] = useState<CrimeData[]>([]);
    const [selectedLGA, setSelectedLGA] = useState<string>('');
    const chartRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://ug7jfdmytf.execute-api.ap-southeast-2.amazonaws.com/v1/get_crime_data');
                const parsedData = JSON.parse(response.data.body).safety_info;
                setCrimeData(parsedData);
                setSelectedLGA(parsedData[0].LGA);
            } catch (error) {
                console.error('Error fetching crime data:', error);
            }
        };
        fetchData();
    }, []);

    const lineChartData = crimeData.map(item => ({
        LGA: item.LGA,
        'Crimes against the person': item.Crimes_against_the_person,
        'Property and deception offences': item.Property_and_deception_offences,
        'Drug offences': item.Drug_offences,
        'Public order and security offences': item.Public_order_and_security_offences,
        'Justice procedures offences': item.Justice_procedures_offences,
        'Other offences': item.Other_offences,
    }));

    const pieChartData = selectedLGA ? [
        { name: 'Crimes against the person', value: crimeData.find(item => item.LGA === selectedLGA)?.Crimes_against_the_person || 0 },
        { name: 'Property and deception offences', value: crimeData.find(item => item.LGA === selectedLGA)?.Property_and_deception_offences || 0 },
        { name: 'Drug offences', value: crimeData.find(item => item.LGA === selectedLGA)?.Drug_offences || 0 },
        { name: 'Public order and security offences', value: crimeData.find(item => item.LGA === selectedLGA)?.Public_order_and_security_offences || 0 },
        { name: 'Justice procedures offences', value: crimeData.find(item => item.LGA === selectedLGA)?.Justice_procedures_offences || 0 },
        { name: 'Other offences', value: crimeData.find(item => item.LGA === selectedLGA)?.Other_offences || 0 },
    ] : [];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

    const chartConfig = {
        'Crimes against the person': { label: 'Crimes against the person', color: COLORS[0] },
        'Property and deception offences': { label: 'Property and deception offences', color: COLORS[1] },
        'Drug offences': { label: 'Drug offences', color: COLORS[2] },
        'Public order and security offences': { label: 'Public order and security offences', color: COLORS[3] },
        'Justice procedures offences': { label: 'Justice procedures offences', color: COLORS[4] },
        'Other offences': { label: 'Other offences', color: COLORS[5] },
    };

    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: CustomizedLabelProps) => {
        const RADIAN = Math.PI / 180;
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <div className="min-h-screen bg-white text-gray-800 overflow-auto p-8">
            <Heading level={3}>Know your risks</Heading>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold mb-4">Trends in Different Types of Offences</h2>
                    <div ref={chartRef} className="w-full aspect-[4/3]">
                        <ChartContainer className="w-full h-full" config={chartConfig}>
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={lineChartData}>
                                    <XAxis dataKey="LGA" />
                                    <YAxis />
                                    {Object.keys(chartConfig).map((key) => (
                                        <Line
                                            key={key}
                                            type="monotone"
                                            dataKey={key}
                                            stroke={chartConfig[key as keyof typeof chartConfig].color}
                                            strokeWidth={2}
                                            dot={{ fill: chartConfig[key as keyof typeof chartConfig].color }}
                                        />
                                    ))}
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                    <Legend />
                                </LineChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold mb-4">Breakdown of Offences by LGA</h2>
                    <Select value={selectedLGA} onValueChange={setSelectedLGA}>
                        <SelectTrigger className="w-full mb-4">
                            <SelectValue placeholder="Select LGA" />
                        </SelectTrigger>
                        <SelectContent>
                            {crimeData.map(item => (
                                <SelectItem key={item.LGA} value={item.LGA}>{item.LGA}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <div ref={chartRef} className="w-full aspect-[4/3]">
                        <ChartContainer className="w-full h-full" config={chartConfig}>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={pieChartData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={renderCustomizedLabel}
                                        outerRadius="80%"
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {pieChartData.map((_, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}