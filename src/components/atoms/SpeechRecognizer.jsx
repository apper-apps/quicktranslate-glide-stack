import React, { useState, useCallback } from 'react';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';
import { toast } from 'react-toastify';

const SpeechRecognizer = ({ onTextReceived, className = "" }) => {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(true);

  const startListening = useCallback(() => {
    // Check for browser support
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setIsSupported(false);
      toast.error('Speech recognition is not supported in this browser');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
      toast.info('Listening... Speak now');
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onTextReceived(transcript);
      toast.success('Speech recognized successfully!');
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      
      let errorMessage = 'Speech recognition failed';
      switch (event.error) {
        case 'no-speech':
          errorMessage = 'No speech detected. Please try again.';
          break;
        case 'audio-capture':
          errorMessage = 'Microphone access denied or unavailable';
          break;
        case 'not-allowed':
          errorMessage = 'Microphone permission denied';
          break;
        case 'network':
          errorMessage = 'Network error during speech recognition';
          break;
        default:
          errorMessage = 'Speech recognition error. Please try again.';
      }
      
      toast.error(errorMessage);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    try {
      recognition.start();
    } catch (error) {
      console.error('Failed to start speech recognition:', error);
      toast.error('Failed to start speech recognition');
      setIsListening(false);
    }
  }, [onTextReceived]);

  const stopListening = useCallback(() => {
    setIsListening(false);
    toast.info('Speech recognition stopped');
  }, []);

  if (!isSupported) {
    return null;
  }

  return (
    <Button
      variant={isListening ? "secondary" : "outline"}
      size="sm"
      onClick={isListening ? stopListening : startListening}
      className={`${className} ${
        isListening 
          ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse' 
          : 'hover:bg-gray-50'
      } transition-all duration-200`}
      title={isListening ? 'Stop listening' : 'Start voice input'}
    >
      <ApperIcon 
        name={isListening ? "MicOff" : "Mic"} 
        size={16} 
        className={isListening ? 'text-white' : 'text-gray-600'} 
      />
      {isListening ? 'Stop' : 'Voice'}
    </Button>
  );
};

export default SpeechRecognizer;