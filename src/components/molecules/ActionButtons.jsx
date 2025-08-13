import React from "react";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { motion } from "framer-motion";

const ActionButtons = ({ 
  onTranslate, 
  onSwapLanguages, 
  onClear, 
  loading = false,
  canSwap = false,
  hasText = false 
}) => {
  return (
    <motion.div 
      className="flex flex-col sm:flex-row items-center justify-center gap-4"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <Button
        onClick={onTranslate}
        loading={loading}
        size="lg"
        className="w-full sm:w-auto min-w-[160px] shadow-lg"
      >
        <ApperIcon name="Languages" className="h-5 w-5 mr-2" />
        {loading ? "Translating..." : "Translate"}
      </Button>

      <div className="flex gap-2">
        {canSwap && (
          <Button
            variant="outline"
            onClick={onSwapLanguages}
            className="h-12 px-4"
            title="Swap Languages"
          >
            <ApperIcon name="ArrowLeftRight" className="h-5 w-5" />
          </Button>
        )}

        {hasText && (
          <Button
            variant="secondary"
            onClick={onClear}
            className="h-12 px-4"
            title="Clear All"
          >
            <ApperIcon name="Trash2" className="h-5 w-5" />
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default ActionButtons;