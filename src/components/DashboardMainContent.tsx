import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
//import { Button } from "@/components/ui/button";
import { Button, Divider } from '@aws-amplify/ui-react'; 
import { Link } from 'react-router-dom';

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

    const articles = [
        { title: "Locate the  nearest rest area and amenities", image: "/Rest1.png?height=200&width=300", description: "The article highlights the challenge of finding a dignified rest area as a gig worker. This includes the availability of basic amenities such as toilets.", path: "rest-areas-and-amenities", ourpage: "interactive-map" },
        { title: "Know your risks", image: "/Rest2.jpg?height=200&width=300", description: "This article highlights safety issues experienced by gig workers between gig work. This includes challenges with robberies, vandalization, and physical and verbal assault.", path: "safe-rest-areas", ourpage: "statistics"  },
        { title: "Can I park here?", image: "/Rest3.png?height=200&width=300", description: "This article highlights gig workers' challenges with parking, often due to their unfamiliarity with available parking options. The lack of knowledge about suitable parking spots also affects finding appropriate rest areas, increasing their risk of unsafe behaviors.", path: "parking", ourpage: "CanIParkHere"  }
    ];

    return (
        <div className="min-h-screen bg-white text-gray-800 overflow-auto font-sans">
            <main className="container mx-auto px-4 py-6 sm:py-8 md:py-10">
                <motion.section
                    ref={ref1}
                    className="flex flex-col md:flex-row items-center justify-between mb-12 md:mb-16"
                    initial="hidden"
                    animate={controls1}
                    variants={containerVariants}
                >
                    <motion.div className="md:w-3/5 mb-8 md:mb-0 pr-0 md:pr-8" variants={itemVariants}>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 leading-tight">
                            Find your perfect unwinding spot between gigs
                        </h1>
                        <p className="text-base md:text-lg text-gray-700 mb-4 leading-relaxed">
                            <b>Need a break?</b>&nbsp;
                            Explore Melbourne's rest spots, amenities, and simplified parking information to ensure peace of mind with RestConnect.
                            <br /><br />
                            Avoid parking fines, all while finding the perfect spot to recharge!
                            <br /><br />
                        </p>
                        <Link to="/rest-areas-and-amenities">
                            <Button className="bg-gray-700 hover:bg-gray-800 text-white font-medium px-6 py-3 rounded-md">Locate the nearest rest area and amenities</Button>
                        </Link>
                    </motion.div>
                    <motion.div className="md:w-1/4" variants={itemVariants}>
                        <img src="/Rest11.jpeg" alt="Gig worker illustration" className="w-full h-auto rounded-lg shadow-lg" />
                    </motion.div>
                </motion.section>

                <Divider size="small" orientation="horizontal" />
                <br />

                <motion.section
                    ref={ref2}
                    initial="hidden"
                    animate={controls2}
                    variants={containerVariants}
                    className="mb-12 md:mb-16"
                >
                    <motion.h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-gray-900" variants={itemVariants}>
                        Key challenges for Gig Workers
                    </motion.h2>
                    <motion.p className="text-base md:text-lg text-gray-700 mb-6 md:mb-8 leading-relaxed" variants={itemVariants}>
                        As a member of the gig community, you're well-acquainted with the various challenges of the job.
                        <br />
                        Check out the articles below to see the major issues affecting the gig community in Melbourne and how RestConnect addresses them.
                    </motion.p>

                    <motion.div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8" variants={itemVariants}>
                        {articles.map((item, index) => (
                            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md">
                                <img src={item.image} alt={item.title} className="w-full h-40 object-cover" />
                                <div className="p-4 md:p-6">
                                    <Button isFullWidth={true} onClick={() => window.location.href=(item.ourpage)}>{item.title}</Button>
                                    <br />
                                    <br />
                                    <p className="text-sm md:text-base text-gray-700 mb-4 leading-relaxed">{item.description}</p>
                                    <Link to={`/${item.path}`} className="text-blue-500 hover:underline font-medium">Learn more →</Link>
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