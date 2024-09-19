'use client'

import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Heading } from '@aws-amplify/ui-react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, Play } from 'lucide-react';

interface CrashData {
    Suburb: string;
    year: string;
    SPEED_ZONE: string;
    flag: string;
    crash_count: number;
}

interface CrimeData {
    LGA: string;
    Postcode: number;
    Suburb_Name: string;
    Offence_Division: string;
    Incidents_Recorded: number;
    postcode_safety_rank: string;
    Safety_Index: number;
    Suggested_Video: string | null;
}

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#0088FE'];

export default function Statistics() {
    const [crashData, setCrashData] = useState<CrashData[]>([]);
    const [crimeData, setCrimeData] = useState<CrimeData[]>([]);
    const [selectedSuburb, setSelectedSuburb] = useState<string>('');
    const [suburbs, setSuburbs] = useState<string[]>([]);
    const [selectedPostcode, setSelectedPostcode] = useState<string>('');
    const [postcodes, setPostcodes] = useState<string[]>([]);
    const [activeTab, setActiveTab] = useState<'accident' | 'crime'>('accident');
    const [videoError, setVideoError] = useState<boolean>(false);
    const [videoErrorMessage, setVideoErrorMessage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
    const navigate = useNavigate();

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const [crashResponse, crimeResponse] = await Promise.all([
                axios.get<{ body: string }>('https://ug7jfdmytf.execute-api.ap-southeast-2.amazonaws.com/v1/get_crash_data'),
                axios.get<{ body: string }>('https://ug7jfdmytf.execute-api.ap-southeast-2.amazonaws.com/v1/get_crime_data')
            ]);

            const parsedCrashData = JSON.parse(crashResponse.data.body).crash_data as CrashData[];
            const parsedCrimeData = JSON.parse(crimeResponse.data.body).safety_info as CrimeData[];

            setCrashData(parsedCrashData);
            setCrimeData(parsedCrimeData);

            const uniqueSuburbs = Array.from(new Set(parsedCrashData.map(item => item.Suburb)));
            setSuburbs(uniqueSuburbs);
            setSelectedSuburb(uniqueSuburbs[0]);

            const uniquePostcodes = Array.from(new Set(parsedCrimeData.map(item => item.Postcode.toString())));
            setPostcodes(uniquePostcodes);
            setSelectedPostcode(uniquePostcodes[0]);

            console.log('Fetched data successfully');
            console.log('Unique postcodes:', uniquePostcodes);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleSuburbChange = (value: string) => {
        setSelectedSuburb(value);
    };

    const handlePostcodeChange = (value: string) => {
        console.log('Postcode changed to:', value);
        setSelectedPostcode(value);
        setVideoError(false);
        setVideoErrorMessage('');
        setSelectedVideo(null);
    };

    const navigateToCanIParkHere = () => {
        navigate('/caniparkhere');
    };

    const processedCrashData = crashData
        .filter(item => item.Suburb === selectedSuburb)
        .reduce<Record<string, { SPEED_ZONE: number; [key: string]: number }>>((acc, item) => {
            const speedZone = parseInt(item.SPEED_ZONE);
            if (!acc[speedZone]) {
                acc[speedZone] = { SPEED_ZONE: speedZone };
            }
            acc[speedZone][item.flag] = (acc[speedZone][item.flag] || 0) + item.crash_count;
            return acc;
        }, {});

    const crashChartData = Object.values(processedCrashData).sort((a, b) => a.SPEED_ZONE - b.SPEED_ZONE);

    const transportModes = Array.from(new Set(crashData.map(item => item.flag)));
    const safestMode = transportModes.reduce((safest, mode) => {
        const totalCrashes = crashChartData.reduce((sum, item) => sum + (item[mode] || 0), 0);
        return totalCrashes < (safest.crashes || Infinity) ? { mode, crashes: totalCrashes } : safest;
    }, { mode: '', crashes: Infinity });

    const selectedPostcodeData = crimeData.filter(item => item.Postcode.toString() === selectedPostcode);
    const top5Risks = selectedPostcodeData
        .sort((a, b) => b.Incidents_Recorded - a.Incidents_Recorded)
        .slice(0, 5);

    const safetyIndex = selectedPostcodeData[0]?.Safety_Index;
    const suggestedVideos = selectedPostcodeData
        .map(item => item.Suggested_Video)
        .filter((video, index, self) => video && self.indexOf(video) === index) as string[];

    useEffect(() => {
        if (suggestedVideos.length > 0) {
            console.log('Suggested video URLs:', suggestedVideos);
        } else {
            console.log('No suggested videos for this postcode');
        }
    }, [suggestedVideos]);

    const handleVideoError = useCallback((e: React.SyntheticEvent<HTMLIFrameElement, Event>) => {
        console.error('Video error:', e);
        setVideoError(true);
        setVideoErrorMessage('Sorry, the suggested video is currently unavailable. This may be due to content restrictions or network issues.');
    }, []);

    const getVideoId = (url: string) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const handleVideoSelect = (video: string) => {
        setSelectedVideo(video);
        setVideoError(false);
        setVideoErrorMessage('');
    };

    const analyzeCrashData = () => {
        const totalCrashes = crashChartData.reduce((sum, item) =>
            sum + transportModes.reduce((modeSum, mode) => modeSum + (item[mode] || 0), 0), 0);

        const highestSpeedZone = crashChartData.reduce((highest, item) => {
            const zoneTotal = transportModes.reduce((sum, mode) => sum + (item[mode] || 0), 0);
            return zoneTotal > highest.total ? { zone: item.SPEED_ZONE, total: zoneTotal } : highest;
        }, { zone: 0, total: 0 });

        return (
            <div className="mt-6 p-4 bg-gray-100 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Crash Data Analysis</h3>
                <p>In {selectedSuburb}, there have been a total of {totalCrashes} reported crashes across all speed zones and transport modes.</p>
                <p>The speed zone with the highest number of crashes is {highestSpeedZone.zone} km/h, accounting for {highestSpeedZone.total} crashes.</p>
                <p>The safest mode of transport appears to be {safestMode.mode}, with the lowest number of reported incidents.</p>
                <p>This data suggests that extra caution should be exercised in {highestSpeedZone.zone} km/h zones, particularly when using modes of transport other than {safestMode.mode}.</p>
            </div>
        );
    };

    const analyzeCrimeData = () => {
        const totalIncidents = top5Risks.reduce((sum, risk) => sum + risk.Incidents_Recorded, 0);
        const highestRisk = top5Risks[0];

        return (
            <div className="mt-6 p-4 bg-gray-100 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Crime Data Analysis</h3>
                <p>In the postcode area {selectedPostcode}, there have been a total of {totalIncidents} recorded incidents across the top 5 risk categories.</p>
                <p>The most prevalent type of offense is {highestRisk.Offence_Division}, with {highestRisk.Incidents_Recorded} recorded incidents.</p>
                <p>The overall safety index for this area is {safetyIndex?.toFixed(2)}, where a higher index indicates a safer area.</p>
                <p>Based on this data, residents and visitors should be particularly vigilant about {highestRisk.Offence_Division.toLowerCase()} in this area. However, it's important to note that this data represents reported incidents and may not capture all aspects of safety in the area.</p>
            </div>
        );
    };

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-white text-gray-800 overflow-auto p-8">
            <div className="container mx-auto px-4 py-6 sm:py-8 md:py-10">
                <Heading level={3}>Know your risks</Heading>
                <p className="text-gray-600 mb-6">Stay informed and rest easy with these insights on crime and accident data</p>

                <div className="mb-6 flex space-x-4">
                    <Button variant={activeTab === 'crime' ? 'default' : 'outline'} onClick={() => setActiveTab('crime')}>Crime Insight</Button>
                    <Button variant={activeTab === 'accident' ? 'default' : 'outline'} onClick={() => setActiveTab('accident')}>Accident Data</Button>
                    <Button variant="outline" onClick={navigateToCanIParkHere}>Can I Park Here?</Button>
                </div>

                {activeTab === 'accident' && (
                    <div>
                        <div className="mb-6 flex space-x-4">
                            <Select value={selectedSuburb} onValueChange={handleSuburbChange}>
                                <SelectTrigger className="w-[200px]">
                                    <SelectValue placeholder="Select suburb" />
                                </SelectTrigger>
                                <SelectContent>
                                    {suburbs.map(suburb => (
                                        <SelectItem key={suburb} value={suburb}>{suburb}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-2xl font-semibold mb-4">Crash Data by Speed Zone and Transport Mode</h2>
                            <ResponsiveContainer width="100%" height={400}>
                                <LineChart
                                    data={crashChartData}
                                    margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis
                                        dataKey="SPEED_ZONE"
                                        type="number"
                                        domain={[0, 100]}
                                        ticks={[0, 20, 40, 60, 80, 100]}
                                        label={{ value: 'Speed Zone (km/h)', position: 'insideBottom', offset: -40 }}
                                    />
                                    <YAxis label={{ value: 'Number of Crashes', angle: -90, position: 'insideLeft', offset: 10 }} />
                                    <Tooltip />
                                    <Legend verticalAlign="top" height={36} />
                                    {transportModes.map((mode, index) => (
                                        <Line
                                            key={mode}
                                            type="monotone"
                                            dataKey={mode}
                                            stroke={COLORS[index % COLORS.length]}
                                            dot={false}
                                        />
                                    ))}
                                </LineChart>
                            </ResponsiveContainer>
                            <p className="mt-4">
                                Safest transport mode in {selectedSuburb}: <strong>{safestMode.mode}</strong>
                            </p>
                            {analyzeCrashData()}
                        </div>
                    </div>
                )}

                {activeTab === 'crime' && (
                    <div>
                        <div className="mb-6 flex space-x-4">
                            <Select value={selectedPostcode} onValueChange={handlePostcodeChange}>
                                <SelectTrigger className="w-[200px]">
                                    <SelectValue placeholder="Select postcode" />
                                </SelectTrigger>
                                <SelectContent>
                                    {postcodes.map(postcode => (
                                        <SelectItem key={postcode} value={postcode}>{postcode}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-2xl font-semibold mb-4">Top 5 Risks in {selectedPostcode}</h2>
                            <ResponsiveContainer width="100%" height={400}>
                                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={top5Risks}>
                                    <PolarGrid />
                                    <PolarAngleAxis dataKey="Offence_Division" />
                                    <PolarRadiusAxis angle={30} domain={[0, 'auto']} />
                                    {top5Risks.map((entry, index) => (
                                        <Radar
                                            key={entry.Offence_Division}
                                            name={entry.Offence_Division}
                                            dataKey="Incidents_Recorded"
                                            stroke={COLORS[index % COLORS.length]}
                                            fill={COLORS[index % COLORS.length]}
                                            fillOpacity={0.6}
                                        />
                                    ))}
                                    <Tooltip />
                                </RadarChart>
                            </ResponsiveContainer>
                            <div className="mt-4 flex flex-wrap justify-center">
                                {top5Risks.map((risk, index) => (
                                    <div key={risk.Offence_Division} className="flex items-center mr-4 mb-2">
                                        <div className="w-4 h-4 mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                                        <span>{risk.Offence_Division}</span>
                                    </div>
                                ))}
                            </div>
                            {safetyIndex !== undefined && (
                                <div className="mt-4 p-4 bg-blue-100 rounded-md">
                                    <p className="font-semibold">Safety Index for {selectedPostcode}: {safetyIndex.toFixed(2)}</p>
                                </div>
                            )}
                            {analyzeCrimeData()}
                            {suggestedVideos.length > 0 && (
                                <div className="mt-4">
                                    <h3 className="text-lg font-semibold mb-2">Suggested Videos:</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                        {suggestedVideos.map((video, index)  => (
                                            <div key={index} className="bg-gray-100 p-4 rounded-lg">
                                                <img
                                                    src={`https://img.youtube.com/vi/${getVideoId(video)}/0.jpg`}
                                                    alt={`Video thumbnail ${index + 1}`}
                                                    className="w-full h-32 object-cover rounded-md mb-2"
                                                />
                                                <Button
                                                    onClick={() => handleVideoSelect(video)}
                                                    className="w-full flex items-center justify-center"
                                                >
                                                    <Play className="mr-2" size={16} />
                                                    Play Video {index + 1}
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {selectedVideo && !videoError && (
                                <div className="mt-4">
                                    <h3 className="text-lg font-semibold mb-2">Selected Video:</h3>
                                    <iframe
                                        width="100%"
                                        height="315"
                                        src={`https://www.youtube.com/embed/${getVideoId(selectedVideo)}`}
                                        title="YouTube video player"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        onError={handleVideoError}
                                    ></iframe>
                                </div>
                            )}
                            {videoError && (
                                <div className="mt-4 p-4 bg-yellow-100 rounded-md flex items-center">
                                    <AlertCircle className="text-yellow-500 mr-2" />
                                    <p>{videoErrorMessage}</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}