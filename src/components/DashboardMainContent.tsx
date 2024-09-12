import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

export const DashboardMainContent: React.FC = () => {
    const controls = useAnimation();
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

    useEffect(() => {
        if (inView) controls.start('visible');
    }, [controls, inView]);

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
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
                <motion.section
                    ref={ref}
                    className="flex flex-col lg:flex-row items-center justify-between mb-12 lg:mb-16 gap-8 lg:gap-12"
                    initial="hidden"
                    animate={controls}
                    variants={containerVariants}
                >
                    <motion.div className="w-full lg:w-1/2" variants={itemVariants}>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 leading-tight">
                            Rest without hassle! Find your perfect unwinding spot between Gigs
                        </h1>
                        <p className="text-base sm:text-lg text-gray-700 mb-4 leading-relaxed">
                            Need a break? Explore Melbourne's rest spots, complimentary amenities, and simplified parking information to ensure peace of mind with RestConnect.
                        </p>
                        <p className="text-base sm:text-lg text-gray-700 mb-6 leading-relaxed">
                            Achieve work-life balance and avoid parking fines, all while finding the perfect spot to recharge!
                        </p>
                        <Link to="/rest-areas-and-amenities">
                            <Button size="lg" className="w-full sm:w-auto bg-gray-700 hover:bg-gray-800 text-white font-medium px-6 py-3 rounded-md">Learn More</Button>
                        </Link>
                    </motion.div>
                    <motion.div className="w-full lg:w-1/2" variants={itemVariants}>
                        <img src="/Rest11.jpeg" alt="Gig worker illustration" className="w-full h-auto rounded-lg shadow-lg" />
                    </motion.div>
                </motion.section>
            </main>
        </div>
    );
};

export default DashboardMainContent;