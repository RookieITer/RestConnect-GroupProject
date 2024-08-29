import React from 'react';
import { motion } from 'framer-motion';

export const DashboardHeader: React.FC = () => {
    return (
        <motion.div
            className="flex items-center justify-center px-6 py-4 bg-gradient-to-r from-blue-100 to-purple-100"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <motion.h1
                className="text-2xl font-bold text-gray-800 tracking-wide"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                RestConnect
            </motion.h1>
        </motion.div>
    );
};

export default DashboardHeader;