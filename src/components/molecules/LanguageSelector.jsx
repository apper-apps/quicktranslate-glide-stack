import React from "react";
import Select from "@/components/atoms/Select";
import ApperIcon from "@/components/ApperIcon";

const LanguageSelector = ({ value, onChange, languages, label, className }) => {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="relative">
        <Select
          value={value}
          onChange={onChange}
          className="pl-10"
        >
{languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </Select>
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <span className="text-lg">{languages.find(l => l.code === value)?.flag || "🌐"}</span>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;