import React from "react";
import ApperIcon from "@/components/ApperIcon";
import { motion } from "framer-motion";

const Loading = ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
      <motion.div
        className="relative"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <div className="w-16 h-16 border-4 border-google-blue border-t-transparent rounded-full"></div>
      </motion.div>
      
      <motion.div
        className="mt-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <ApperIcon name="Languages" className="h-8 w-8 text-google-blue mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {message}
        </h3>
        <p className="text-gray-500">
          Please wait while we process your request
        </p>
      </motion.div>

      {/* Shimmer effect for translation cards */}
      <div className="w-full max-w-4xl mt-8 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[1, 2].map((index) => (
            <div key={index} className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                <div className="space-y-3">
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                  <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loading;