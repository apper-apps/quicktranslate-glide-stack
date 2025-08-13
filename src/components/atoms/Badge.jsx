import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Badge = forwardRef(({ 
  className, 
  variant = "default",
  ...props 
}, ref) => {
  const variants = {
    default: "bg-gray-100 text-gray-900 hover:bg-gray-200",
    primary: "bg-google-blue text-white hover:bg-blue-600",
    success: "bg-google-green text-white hover:bg-green-600",
    warning: "bg-google-yellow text-gray-900 hover:bg-yellow-500",
    error: "bg-google-red text-white hover:bg-red-600"
  };

  return (
    <div
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400",
        variants[variant],
        className
      )}
      {...props}
    />
  );
});

Badge.displayName = "Badge";

export default Badge;