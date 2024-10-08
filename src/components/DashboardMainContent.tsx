'use client'

import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Divider } from '@aws-amplify/ui-react';
import { Link } from 'react-router-dom';
import { Map, ClipboardList, Image, Newspaper } from 'lucide-react';
import {FaHandHoldingMedical} from "react-icons/fa6";
import { Heading, Button } from '@aws-amplify/ui-react'; 


export const DashboardMainContent: React.FC = () => {
    const controls1 = useAnimation();
    const controls2 = useAnimation();
    const controls3 = useAnimation();
    const imageControls = useAnimation();

    const [ref1, inView1] = useInView({ triggerOnce: true, threshold: 0.1 });
    const [ref2, inView2] = useInView({ triggerOnce: true, threshold: 0.1 });
    const [ref3, inView3] = useInView({ triggerOnce: true, threshold: 0.1 });

    useEffect(() => {
        if (inView1) controls1.start('visible');
        if (inView2) controls2.start('visible');
        if (inView3) controls3.start('visible');
    }, [controls1, controls2, controls3, inView1, inView2, inView3]);

    useEffect(() => {
        const animateImage = async () => {
            while (true) {
                await imageControls.start({
                    y: [0, -10, 0],
                    transition: { duration: 0.5 }
                });
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        };
        animateImage();
    }, [imageControls]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
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
                duration: 0.5,
            },
        },
    };

    const articles = [
        { title: "Locate the nearest rest area and amenities", image: "/Rest1.png?height=200&width=300", description: "The article highlights the challenge of finding a dignified rest area as a gig worker. This includes the availability of basic amenities such as toilets.", path: "rest-areas-and-amenities", ourpage: "interactive-map" },
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
                    <motion.div className="md:w-1/2 mb-8 md:mb-0 pr-0 md:pr-8 p-6 rounded-lg" variants={itemVariants}>
                        <p className="text-base md:text-lg text-gray-700 mb-4 leading-relaxed">
    
                            <Heading level={2}>Gig Worker life made easy</Heading>
                            <br />

                            <b>Master Your Gig Journey!</b>&nbsp;
                            Explore Melbourne's rest spots, amenities, and simplified parking information, along with essential resources from our Support Hub, to ensure peace of mind with RestConnect.
                            <br /><br />
                        </p>
                        <Link to="/interactive-map">
                            <Button variation="primary" height={"3em"}>Locate the nearest rest area and amenities</Button>
                        </Link>
                    </motion.div>
                    <motion.div
                        className="md:w-1/2"
                        variants={itemVariants}
                        animate={imageControls}
                    >
                        <img src="/HomePageImg.svg" alt="Gig worker illustration" className="w-full h-auto rounded-lg shadow-lg" />
                    </motion.div>
                </motion.section>

                <Divider size="small" orientation="horizontal" />
                <br />

                <motion.section
                    ref={ref3}
                    initial="hidden"
                    animate={controls3}
                    variants={containerVariants}
                    className="mb-12 md:mb-16 bg-[#e6f3ff] p-6 rounded-lg"
                >
                    <motion.h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 text-center" variants={itemVariants}>
                        RestConnect Your On-the-Road Companion
                    </motion.h2>
                    <motion.p className="text-base md:text-lg text-gray-700 mb-6 text-center" variants={itemVariants}>
                        Navigate Confidently with Our Smart Tools!
                    </motion.p>
                    <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6" variants={containerVariants}>
                        {[
                            { icon: Map, title: "Explore Rest Areas Map", description: "Our interactive map helps users easily locate dignified rest areas with essential amenities.", link: "/interactive-map", linkText: "Explore the Map" },
                            { icon: ClipboardList, title: "Evaluate Safety Risks Nearby", description: "Our tool provides safety evaluations of Local Government Areas, analyzing crime and accident data.", link: "/statistics", linkText: "Evaluate your Area's Risk" },
                            { icon: Image, title: "Parking Sign Identifier Tool", description: "Our \"Can I Park Here?\" feature uses photo recognition to analyse uploaded parking signs for you.", link: "/caniparkhere", linkText: "Confirm Your Parking" },
                            { icon: FaHandHoldingMedical, title: "Discover the Support Hub", description: "Our support hub offers essential information on vital resources, including healthcare, legal advice, and more", link: "/supporthub", linkText: "Explore the Hub" }
                        ].map((item, index) => (
                            <motion.div key={index} className="bg-white p-6 rounded-lg shadow-md" variants={itemVariants}>
                                <item.icon className="w-12 h-12 mb-4 text-blue-500" />
                                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                                <p className="text-gray-600 mb-4">{item.description}</p>
                                {item.link && (
                                    <Link to={item.link} className="text-blue-500 hover:underline">{item.linkText}</Link>
                                )}
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.section>

                <Divider size="small" orientation="horizontal" />
                <br />

                <motion.section
                    ref={ref2}
                    initial="hidden"
                    animate={controls2}
                    variants={containerVariants}
                    className="mb-12 md:mb-16 text-center"
                >
                    <motion.div className="inline-block mb-8" variants={itemVariants}>
                        <Heading level={2}>Latest News</Heading>

                    </motion.div>
                    <motion.p className="text-base md:text-lg text-gray-700 mb-6 md:mb-8 leading-relaxed max-w-2xl mx-auto" variants={itemVariants}>
                        As part of the gig community, you face unique challenges. Explore the 'Learn More' links to discover key issues, and press the associated buttons to see how RestConnect can support you.
                    </motion.p>

                    <motion.div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8" variants={containerVariants}>
                        {articles.map((item, index) => (
                            <motion.div key={index} className="bg-white rounded-lg overflow-hidden shadow-md" variants={itemVariants}>
                                <img src={item.image} alt={item.title} className="w-full h-40 object-cover" />
                                <div className="p-4 md:p-6">
                                    <Button isFullWidth={true} onClick={() => window.location.href=(item.ourpage)}>{item.title}</Button>
                                    <br />
                                    <br />
                                    <p className="text-sm md:text-base text-gray-700 mb-4 leading-relaxed">{item.description}</p>
                                    <Link to={`/${item.path}`} className="text-blue-500 hover:underline font-medium">Learn more →</Link>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.section>
            </main>
        </div>
    );
};

export default DashboardMainContent;