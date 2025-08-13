import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Select = forwardRef(({ 
  className, 
  children,
  error = false,
  ...props 
}, ref) => {
  return (
    <div className="relative">
      <select
        className={cn(
          "flex h-12 w-full appearance-none rounded-lg border bg-white px-4 py-3 pr-10 text-base ring-offset-white focus:outline-none focus:ring-2 focus:ring-google-blue focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
          error
            ? "border-google-red focus:ring-google-red"
            : "border-gray-300 hover:border-gray-400 focus:border-google-blue",
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
        <ApperIcon name="ChevronDown" className="h-4 w-4 text-gray-400" />
      </div>
    </div>
  );
});

Select.displayName = "Select";

export default Select;