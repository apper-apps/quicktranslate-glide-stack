import React from "react";
import Badge from "@/components/atoms/Badge";
import { motion } from "framer-motion";

const QuickPhrases = ({ phrases, onPhraseClick }) => {
  return (
    <motion.div 
      className="space-y-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <h4 className="text-sm font-medium text-gray-700">Quick Phrases:</h4>
      <div className="flex flex-wrap gap-2">
        {phrases.map((phrase, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Badge
              variant="default"
              className="cursor-pointer hover:shadow-sm transition-all duration-200"
              onClick={() => onPhraseClick(phrase)}
            >
              {phrase}
            </Badge>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default QuickPhrases;