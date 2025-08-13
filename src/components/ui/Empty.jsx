import React from "react";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { motion } from "framer-motion";

const Empty = ({ 
  message = "No data available",
  description = "There's nothing to show here yet.",
  actionLabel = "Get Started",
  onAction
}) => {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="w-16 h-16 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full flex items-center justify-center mb-6"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <ApperIcon name="Languages" className="h-8 w-8 text-white" />
      </motion.div>
      
      <h3 className="text-2xl font-bold text-gray-900 mb-2">
        {message}
      </h3>
      
      <p className="text-gray-600 mb-6 max-w-md">
        {description}
      </p>
      
      {onAction && actionLabel && (
        <Button
          onClick={onAction}
          variant="primary"
          className="inline-flex items-center"
        >
          <ApperIcon name="Plus" className="h-4 w-4 mr-2" />
          {actionLabel}
        </Button>
      )}
    </motion.div>
  );
};

export default Empty;