import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Button } from "@/components/ui/button";

export const DashboardMainContent: React.FC = () => {
    const controls1 = useAnimation();
    const controls2 = useAnimation();

    const [ref1, inView1] = useInView({ triggerOnce: true, threshold: 0.1 });
    const [ref2, inView2] = useInView({ triggerOnce: true, threshold: 0.1 });

    useEffect(() => {
        if (inView1) controls1.start('visible');
        if (inView2) controls2.start('visible');
    }, [controls1, controls2, inView1, inView2]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100,
            },
        },
    };

    return (
        <div className="min-h-screen bg-white text-gray-800 overflow-auto font-sans">
            <main className="container mx-auto px-4 py-12">
                <motion.section
                    ref={ref1}
                    className="flex flex-col md:flex-row items-center justify-between mb-16"
                    initial="hidden"
                    animate={controls1}
                    variants={containerVariants}
                >
                    <motion.div className="md:w-1/2 mb-8 md:mb-0" variants={itemVariants}>
                        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 leading-tight">
                            Rest without hassle! Find your perfect unwinding spot between Gigs
                        </h1>
                        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                            Need a break? Explore Melbourne's rest spots, complimentary amenities, and simplified parking information to ensure peace of mind with RestConnect.
                        </p>
                        <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                            Achieve work-life balance and avoid parking fines, all while finding the perfect spot to recharge!
                        </p>
                        <Button size="lg" className="bg-gray-700 hover:bg-gray-800 text-white font-medium px-6 py-3 rounded-md">Learn More</Button>
                    </motion.div>
                    <motion.div className="md:w-1/2" variants={itemVariants}>
                        <img src="/placeholder.svg?height=400&width=400" alt="Gig worker illustration" className="w-full h-auto rounded-lg shadow-lg" />
                    </motion.div>
                </motion.section>

                <motion.section
                    ref={ref2}
                    initial="hidden"
                    animate={controls2}
                    variants={containerVariants}
                    className="mb-16"
                >
                    <motion.h2 className="text-3xl font-bold mb-6 text-gray-900" variants={itemVariants}>
                        Key challenges for Gig Workers
                    </motion.h2>
                    <motion.p className="text-lg text-gray-700 mb-8 leading-relaxed" variants={itemVariants}>
                        As a member of the gig community, you're well-acquainted with the various challenges of the job. Check out the articles below to see the major issues affecting the gig community in Melbourne and how RestConnect addresses them.
                    </motion.p>
                    <motion.div className="flex flex-wrap justify-center gap-4 mb-8" variants={itemVariants}>
                        <Button variant="outline" className="border-gray-700 text-gray-700 hover:bg-gray-100 font-medium px-4 py-2 rounded-md">Rest Areas and Amenities</Button>
                        <Button variant="outline" className="border-gray-700 text-gray-700 hover:bg-gray-100 font-medium px-4 py-2 rounded-md">Safe Rest Areas and Risk</Button>
                        <Button variant="outline" className="border-gray-700 text-gray-700 hover:bg-gray-100 font-medium px-4 py-2 rounded-md">Parking</Button>
                    </motion.div>
                    <motion.div className="grid md:grid-cols-3 gap-8" variants={itemVariants}>
                        {[
                            { title: "Rest Areas and Amenities", image: "/placeholder.svg?height=200&width=300", description: "The article highlights the challenge of finding a dignified rest area as a gig worker. This includes the availability of basic amenities such as toilets." },
                            { title: "Safe Rest Areas and Risk", image: "/placeholder.svg?height=200&width=300", description: "This article highlights safety issues experienced by gig workers between gig work. This includes challenges with robberies, vandalization, and physical and verbal assault." },
                            { title: "Parking", image: "/placeholder.svg?height=200&width=300", description: "This article highlights gig workers' challenges with parking, often due to their unfamiliarity with available parking options. The lack of knowledge about suitable parking spots also affects finding appropriate rest areas, increasing their risk of unsafe behaviors." }
                        ].map((item, index) => (
                            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md">
                                <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold mb-2 text-gray-900">{item.title}</h3>
                                    <p className="text-gray-700 mb-4 leading-relaxed">{item.description}</p>
                                    <a href="#" className="text-blue-500 hover:underline font-medium">Learn more →</a>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </motion.section>
            </main>
        </div>
    );
};

export default DashboardMainContent;