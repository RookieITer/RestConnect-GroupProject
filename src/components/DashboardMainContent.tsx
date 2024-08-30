import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/Icons";

export const DashboardMainContent: React.FC = () => {
    const controls1 = useAnimation();
    const controls2 = useAnimation();
    const controls3 = useAnimation();
    const controls4 = useAnimation();

    const [ref1, inView1] = useInView({ triggerOnce: true, threshold: 0.1 });
    const [ref2, inView2] = useInView({ triggerOnce: true, threshold: 0.1 });
    const [ref3, inView3] = useInView({ triggerOnce: true, threshold: 0.1 });
    const [ref4, inView4] = useInView({ triggerOnce: true, threshold: 0.1 });

    useEffect(() => {
        if (inView1) controls1.start('visible');
        if (inView2) controls2.start('visible');
        if (inView3) controls3.start('visible');
        if (inView4) controls4.start('visible');
    }, [controls1, controls2, controls3, controls4, inView1, inView2, inView3, inView4]);

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
        <div className="min-h-screen bg-gradient-to-br from-pink-200 via-pink-300 to-orange-200 text-gray-800 overflow-auto">
            <main className="container mx-auto px-4 py-12">
                <motion.section
                    ref={ref1}
                    className="text-center mb-16"
                    initial="hidden"
                    animate={controls1}
                    variants={containerVariants}
                >
                    <motion.h1
                        className="text-4xl md:text-5xl font-bold mb-4"
                        variants={itemVariants}
                    >
                        Welcome to RestConnect
                    </motion.h1>
                    <motion.p
                        className="text-xl text-gray-700 mb-8"
                        variants={itemVariants}
                    >
                        Manage your projects, track your progress, and achieve your goals with RestConnect.
                    </motion.p>
                    <motion.div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4" variants={itemVariants}>
                        <Button size="lg" className="bg-pink-500 hover:bg-pink-600 text-white">Create New Project</Button>
                        <Button size="lg" variant="outline" className="border-pink-500 text-pink-500 hover:bg-pink-100">View Analytics</Button>
                    </motion.div>
                </motion.section>

                <motion.section
                    ref={ref2}
                    initial="hidden"
                    animate={controls2}
                    variants={containerVariants}
                    className="grid md:grid-cols-3 gap-8 mb-16"
                >
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                        <motion.div key={item} className="bg-white bg-opacity-80 p-6 rounded-lg shadow-md backdrop-filter backdrop-blur-sm" variants={itemVariants}>
                            <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center mb-4">
                                <Icons.Check className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Key Feature {item}</h3>
                            <p className="text-gray-700">
                                Explore the powerful features of RestConnect designed to streamline your workflow and boost productivity.
                            </p>
                        </motion.div>
                    ))}
                </motion.section>

                <motion.section
                    ref={ref3}
                    initial="hidden"
                    animate={controls3}
                    variants={containerVariants}
                    className="text-center mb-16"
                >
                    <motion.h2 className="text-3xl font-bold mb-4" variants={itemVariants}>
                        Your Project Roadmap
                    </motion.h2>
                    <motion.p className="text-xl text-gray-700 mb-8" variants={itemVariants}>
                        Track your project milestones and stay on top of your goals with our interactive roadmap.
                    </motion.p>
                    <motion.div className="space-y-4 bg-white bg-opacity-80 p-6 rounded-lg shadow-md backdrop-filter backdrop-blur-sm" variants={itemVariants}>
                        {['PHASE 1', 'PHASE 2', 'PHASE 3', 'PHASE 4', 'PHASE 5'].map((phase, index) => (
                            <div key={index} className="flex items-center">
                                <div className="w-4 h-4 bg-pink-500 rounded-full mr-4"></div>
                                <div className="text-left">
                                    <p className="text-sm text-gray-600">{phase}</p>
                                    <p className="font-semibold text-gray-800">Complete project milestone and conduct progress review</p>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </motion.section>

                <motion.section
                    ref={ref4}
                    initial="hidden"
                    animate={controls4}
                    variants={containerVariants}
                    className="text-center mb-16"
                >
                    <motion.h2 className="text-3xl font-bold mb-4" variants={itemVariants}>
                        Recent Updates
                    </motion.h2>
                    <motion.p className="text-xl text-gray-700 mb-8" variants={itemVariants}>
                        Stay informed about the latest features and improvements in RestConnect.
                    </motion.p>
                    <motion.div className="grid md:grid-cols-3 gap-8" variants={itemVariants}>
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="bg-white bg-opacity-80 rounded-lg overflow-hidden shadow-md backdrop-filter backdrop-blur-sm">
                                <img src={`https://source.unsplash.com/random/800x600?sig=${item}`} alt="Update" className="w-full h-48 object-cover" />
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold mb-2">New Feature Release</h3>
                                    <p className="text-gray-700 mb-4">
                                        We've added exciting new capabilities to enhance your project management experience. Discover how these updates can improve your workflow.
                                    </p>
                                    <a href="#" className="text-pink-500 hover:underline">Learn more →</a>
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