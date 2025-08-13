import React, { useState, useEffect } from "react";
import TranslationForm from "@/components/organisms/TranslationForm";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { toast } from "react-toastify";
import translationService from "@/services/api/translationService";
import languageService from "@/services/api/languageService";

const TranslatePage = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [sourceLanguage, setSourceLanguage] = useState("auto");
  const [targetLanguage, setTargetLanguage] = useState("en");
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [initialLoading, setInitialLoading] = useState(true);

  const quickPhrases = [
    "Hello, how are you?",
    "Thank you very much",
    "Good morning",
    "Excuse me",
    "Where is the bathroom?",
    "How much does it cost?",
    "I don't understand",
    "Can you help me?",
    "Good night",
    "See you later"
  ];

  useEffect(() => {
    loadLanguages();
  }, []);

  const loadLanguages = async () => {
    try {
      setError("");
      const data = await languageService.getAll();
      setLanguages(data);
    } catch (err) {
      setError("Failed to load languages");
      toast.error("Failed to load languages");
    } finally {
      setInitialLoading(false);
    }
  };

  const handleTranslate = async () => {
    if (!inputText.trim()) {
      toast.error("Please enter text to translate");
      return;
    }

    if (sourceLanguage === targetLanguage) {
      toast.error("Source and target languages cannot be the same");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await translationService.translate(
        inputText.trim(),
        sourceLanguage,
        targetLanguage
      );
      
      setOutputText(result.translatedText);
      toast.success("Translation completed successfully!");
    } catch (err) {
      setError("Translation failed. Please try again.");
      toast.error("Translation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return <Loading />;
  }

  if (error && languages.length === 0) {
    return <Error message={error} onRetry={loadLanguages} />;
  }

  if (languages.length === 0) {
    return <Empty message="No languages available" />;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Translate Text Instantly
        </h2>
        <p className="text-lg text-gray-600">
          Enter your text and get accurate translations in seconds
        </p>
      </div>

      <TranslationForm
        inputText={inputText}
        setInputText={setInputText}
        outputText={outputText}
        setOutputText={setOutputText}
        sourceLanguage={sourceLanguage}
        setSourceLanguage={setSourceLanguage}
        targetLanguage={targetLanguage}
        setTargetLanguage={setTargetLanguage}
        languages={languages}
        onTranslate={handleTranslate}
        loading={loading}
        quickPhrases={quickPhrases}
      />
    </div>
  );
};

export default TranslatePage;