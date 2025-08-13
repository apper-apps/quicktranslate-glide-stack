import React, { useState } from "react";
import Textarea from "@/components/atoms/Textarea";
import LanguageSelector from "@/components/molecules/LanguageSelector";
import ActionButtons from "@/components/molecules/ActionButtons";
import TranslationCard from "@/components/molecules/TranslationCard";
import QuickPhrases from "@/components/molecules/QuickPhrases";
import ApperIcon from "@/components/ApperIcon";
import { motion } from "framer-motion";

const TranslationForm = ({
  inputText,
  setInputText,
  outputText,
  setOutputText,
  sourceLanguage,
  setSourceLanguage,
  targetLanguage,
  setTargetLanguage,
  languages,
  onTranslate,
  loading,
  quickPhrases
}) => {
  const handleSwapLanguages = () => {
    if (sourceLanguage !== "auto") {
      const temp = sourceLanguage;
      setSourceLanguage(targetLanguage);
      setTargetLanguage(temp);
      
      // Swap text content
      const tempText = inputText;
      setInputText(outputText);
      setOutputText(tempText);
    }
  };

  const handleClear = () => {
    setInputText("");
    setOutputText("");
  };

  const handlePhraseClick = (phrase) => {
    setInputText(phrase);
  };

  return (
    <div className="space-y-8">
      {/* Language Selectors */}
<motion.div 
        className="relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-16">
          <LanguageSelector
            value={sourceLanguage}
            onChange={(e) => setSourceLanguage(e.target.value)}
            languages={languages}
            label="From"
          />
          
          <LanguageSelector
            value={targetLanguage}
            onChange={(e) => setTargetLanguage(e.target.value)}
            languages={languages.filter(lang => lang.code !== "auto")}
            label="To"
          />
        </div>
        
        {/* Toggle Button */}
        <div className="flex justify-center mt-4 md:mt-0">
          <motion.button
            onClick={handleSwapLanguages}
            disabled={sourceLanguage === "auto"}
            className={`
              absolute md:top-1/2 md:-translate-y-1/2 md:left-1/2 md:-translate-x-1/2
              inline-flex items-center justify-center
              w-10 h-10 rounded-full border-2 transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-google-blue focus:ring-offset-2
              ${sourceLanguage === "auto" 
                ? "border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed" 
                : "border-google-blue bg-white text-google-blue hover:bg-google-blue hover:text-white shadow-sm hover:shadow-md"
              }
            `}
            whileHover={sourceLanguage !== "auto" ? { scale: 1.05 } : {}}
            whileTap={sourceLanguage !== "auto" ? { scale: 0.95 } : {}}
          >
            <ApperIcon 
              name="ArrowLeftRight" 
              size={16} 
              className={`transition-transform duration-200 ${
                sourceLanguage !== "auto" ? "group-hover:rotate-180" : ""
              }`}
            />
          </motion.button>
        </div>
      </motion.div>

      {/* Translation Areas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Area */}
        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter text to translate
            </label>
            <Textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your text here..."
              className="min-h-[200px] text-base"
            />
          </div>
          
          {/* Quick Phrases */}
          <QuickPhrases
            phrases={quickPhrases}
            onPhraseClick={handlePhraseClick}
          />
        </motion.div>

        {/* Output Area */}
        <TranslationCard
          title="Translation"
          text={outputText}
          placeholder="Translation will appear here..."
          isOutput={true}
          showActions={true}
        />
      </div>

      {/* Action Buttons */}
      <ActionButtons
        onTranslate={onTranslate}
        onSwapLanguages={handleSwapLanguages}
        onClear={handleClear}
        loading={loading}
        canSwap={sourceLanguage !== "auto" && outputText}
        hasText={inputText || outputText}
      />
    </div>
  );
};

export default TranslationForm;