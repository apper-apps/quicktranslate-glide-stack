import React from "react";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { motion } from "framer-motion";

const Error = ({ 
  message = "Something went wrong", 
  onRetry,
  description = "We encountered an error while processing your request. Please try again." 
}) => {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="w-16 h-16 bg-gradient-to-r from-google-red to-red-600 rounded-full flex items-center justify-center mb-6"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ApperIcon name="AlertTriangle" className="h-8 w-8 text-white" />
      </motion.div>
      
      <h3 className="text-2xl font-bold text-gray-900 mb-2">
        {message}
      </h3>
      
      <p className="text-gray-600 mb-6 max-w-md">
        {description}
      </p>
      
      {onRetry && (
        <Button
          onClick={onRetry}
          variant="primary"
          className="inline-flex items-center"
        >
          <ApperIcon name="RotateCcw" className="h-4 w-4 mr-2" />
          Try Again
        </Button>
      )}
    </motion.div>
  );
};

export default Error;