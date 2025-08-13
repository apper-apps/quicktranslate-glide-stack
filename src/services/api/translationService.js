class TranslationService {
  constructor() {
    this.tableName = 'translation_c';
    this.apperClient = null;
    this.initializeClient();
    // Keep mock translation logic for translation functionality
    this.mockTranslations = {
      "en-es": {
        "hello": "hola",
        "goodbye": "adiós",
        "thank you": "gracias",
        "please": "por favor",
        "yes": "sí",
        "no": "no",
        "good morning": "buenos días",
        "good night": "buenas noches",
        "how are you": "cómo estás",
        "hello, how are you?": "hola, ¿cómo estás?",
        "thank you very much": "muchas gracias",
        "excuse me": "disculpe",
        "where is the bathroom?": "¿dónde está el baño?",
        "how much does it cost?": "¿cuánto cuesta?",
        "i don't understand": "no entiendo",
        "can you help me?": "¿puedes ayudarme?",
        "see you later": "hasta luego"
      },
      "en-fr": {
        "hello": "bonjour",
        "goodbye": "au revoir",
        "thank you": "merci",
        "please": "s'il vous plaît",
        "yes": "oui",
        "no": "non",
        "good morning": "bonjour",
        "good night": "bonne nuit",
        "how are you": "comment allez-vous",
        "hello, how are you?": "bonjour, comment allez-vous?",
        "thank you very much": "merci beaucoup",
        "excuse me": "excusez-moi",
        "where is the bathroom?": "où sont les toilettes?",
        "how much does it cost?": "combien ça coûte?",
        "i don't understand": "je ne comprends pas",
        "can you help me?": "pouvez-vous m'aider?",
        "see you later": "à plus tard"
      },
      "en-de": {
        "hello": "hallo",
        "goodbye": "auf wiedersehen",
        "thank you": "danke",
        "please": "bitte",
        "yes": "ja",
        "no": "nein",
        "good morning": "guten morgen",
        "good night": "gute nacht",
        "how are you": "wie geht es dir",
        "hello, how are you?": "hallo, wie geht es dir?",
        "thank you very much": "vielen dank",
        "excuse me": "entschuldigung",
        "where is the bathroom?": "wo ist das badezimmer?",
        "how much does it cost?": "wie viel kostet das?",
        "i don't understand": "ich verstehe nicht",
        "can you help me?": "können sie mir helfen?",
        "see you later": "bis später"
      },
      "en-hi": {
        "hello": "नमस्ते",
        "goodbye": "अलविदा",
        "thank you": "धन्यवाद",
        "please": "कृपया",
        "yes": "हाँ",
        "no": "नहीं",
        "good morning": "सुप्रभात",
        "good night": "शुभ रात्रि",
        "how are you": "आप कैसे हैं",
        "hello, how are you?": "नमस्ते, आप कैसे हैं?",
        "thank you very much": "बहुत धन्यवाद",
        "excuse me": "माफ़ कीजिये",
        "where is the bathroom?": "बाथरूम कहाँ है?",
        "how much does it cost?": "यह कितने का है?",
        "i don't understand": "मुझे समझ नहीं आया",
        "can you help me?": "क्या आप मेरी मदद कर सकते हैं?",
        "see you later": "बाद में मिलते हैं"
      }
    };
  }

  initializeClient() {
    const { ApperClient } = window.ApperSDK;
    this.apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
  }

  async translate(text, sourceLang, targetLang) {
    if (!text || !text.trim()) {
      throw new Error("Text is required for translation");
    }

    if (sourceLang === targetLang) {
      throw new Error("Source and target languages cannot be the same");
    }

    // Simulate API translation with mock data
    const translationKey = sourceLang === "auto" ? `en-${targetLang}` : `${sourceLang}-${targetLang}`;
    const textLower = text.toLowerCase().trim();
    
    let translatedText = text;
    
    if (this.mockTranslations[translationKey]) {
      const translation = this.mockTranslations[translationKey][textLower];
      if (translation) {
        translatedText = translation;
      } else {
        // Generate a mock translation for unknown text
        translatedText = this.generateMockTranslation(text, targetLang);
      }
    } else {
      // Generate a mock translation for unsupported language pairs
      translatedText = this.generateMockTranslation(text, targetLang);
    }

    // Save translation to database
    try {
      const savedTranslation = await this.create({
        sourceText: text,
        translatedText: translatedText,
        sourceLang: sourceLang,
        targetLang: targetLang
      });

      return {
        Id: savedTranslation.Id,
        sourceText: savedTranslation.sourceText,
        translatedText: savedTranslation.translatedText,
        sourceLang: savedTranslation.sourceLang,
        targetLang: savedTranslation.targetLang,
        timestamp: savedTranslation.timestamp
      };
    } catch (error) {
      // If database save fails, still return the translation
      console.error("Failed to save translation to database:", error.message);
      return {
        sourceText: text,
        translatedText: translatedText,
        sourceLang: sourceLang,
        targetLang: targetLang,
        timestamp: new Date().toISOString()
      };
    }
  }

  generateMockTranslation(text, targetLang) {
    // Simple mock translation by adding language prefix
    const prefixes = {
      "es": "[ES] ",
      "fr": "[FR] ",
      "de": "[DE] ",
      "it": "[IT] ",
      "pt": "[PT] ",
      "ru": "[RU] ",
      "ja": "[JA] ",
      "ko": "[KO] ",
      "zh": "[ZH] ",
      "ar": "[AR] ",
      "hi": "[HI] ",
      "tr": "[TR] ",
      "nl": "[NL] ",
      "pl": "[PL] ",
      "sv": "[SV] ",
      "da": "[DA] ",
      "no": "[NO] ",
      "fi": "[FI] "
    };
    
    return `${prefixes[targetLang] || "[TRANSLATED] "}${text}`;
  }

  async getAll() {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "source_text_c" } },
          { field: { Name: "translated_text_c" } },
          { field: { Name: "source_lang_c" } },
          { field: { Name: "target_lang_c" } },
          { field: { Name: "timestamp_c" } }
        ],
        orderBy: [
          { fieldName: "timestamp_c", sorttype: "DESC" }
        ]
      };

      const response = await this.apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      // Map database fields to UI expected format
      const translations = (response.data || []).map(trans => ({
        Id: trans.Id,
        sourceText: trans.source_text_c,
        translatedText: trans.translated_text_c,
        sourceLang: trans.source_lang_c,
        targetLang: trans.target_lang_c,
        timestamp: trans.timestamp_c
      }));

      return translations;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching translations:", error?.response?.data?.message);
        throw new Error(error?.response?.data?.message);
      } else {
        console.error("Error fetching translations:", error.message);
        throw new Error(error.message);
      }
    }
  }

  async getById(id) {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "source_text_c" } },
          { field: { Name: "translated_text_c" } },
          { field: { Name: "source_lang_c" } },
          { field: { Name: "target_lang_c" } },
          { field: { Name: "timestamp_c" } }
        ]
      };

      const response = await this.apperClient.getRecordById(this.tableName, id, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (!response.data) {
        throw new Error("Translation not found");
      }

      // Map database fields to UI expected format
      return {
        Id: response.data.Id,
        sourceText: response.data.source_text_c,
        translatedText: response.data.translated_text_c,
        sourceLang: response.data.source_lang_c,
        targetLang: response.data.target_lang_c,
        timestamp: response.data.timestamp_c
      };
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching translation by ID:", error?.response?.data?.message);
        throw new Error(error?.response?.data?.message);
      } else {
        console.error("Error fetching translation by ID:", error.message);
        throw new Error(error.message);
      }
    }
  }

  async create(translationData) {
    try {
      // Map UI fields to database fields, only Updateable fields
      const params = {
        records: [{
          Name: translationData.sourceText || "Translation",
          source_text_c: translationData.sourceText,
          translated_text_c: translationData.translatedText,
          source_lang_c: translationData.sourceLang,
          target_lang_c: translationData.targetLang,
          timestamp_c: new Date().toISOString()
        }]
      };

      const response = await this.apperClient.createRecord(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create translation ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              throw new Error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) throw new Error(record.message);
          });
        }
        
        if (successfulRecords.length > 0) {
          const result = successfulRecords[0].data;
          return {
            Id: result.Id,
            sourceText: result.source_text_c,
            translatedText: result.translated_text_c,
            sourceLang: result.source_lang_c,
            targetLang: result.target_lang_c,
            timestamp: result.timestamp_c
          };
        }
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating translation:", error?.response?.data?.message);
        throw new Error(error?.response?.data?.message);
      } else {
        console.error("Error creating translation:", error.message);
        throw new Error(error.message);
      }
    }
  }

  async update(id, translationData) {
    try {
      // Map UI fields to database fields, only Updateable fields
      const params = {
        records: [{
          Id: parseInt(id),
          Name: translationData.sourceText || "Translation",
          source_text_c: translationData.sourceText,
          translated_text_c: translationData.translatedText,
          source_lang_c: translationData.sourceLang,
          target_lang_c: translationData.targetLang,
          timestamp_c: translationData.timestamp || new Date().toISOString()
        }]
      };

      const response = await this.apperClient.updateRecord(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update translation ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
          
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              throw new Error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) throw new Error(record.message);
          });
        }
        
        if (successfulUpdates.length > 0) {
          const result = successfulUpdates[0].data;
          return {
            Id: result.Id,
            sourceText: result.source_text_c,
            translatedText: result.translated_text_c,
            sourceLang: result.source_lang_c,
            targetLang: result.target_lang_c,
            timestamp: result.timestamp_c
          };
        }
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating translation:", error?.response?.data?.message);
        throw new Error(error?.response?.data?.message);
      } else {
        console.error("Error updating translation:", error.message);
        throw new Error(error.message);
      }
    }
  }

  async delete(id) {
    try {
      const params = {
        RecordIds: [parseInt(id)]
      };

      const response = await this.apperClient.deleteRecord(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete translation ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
          
          failedDeletions.forEach(record => {
            if (record.message) throw new Error(record.message);
          });
        }
        
        return successfulDeletions.length > 0;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting translation:", error?.response?.data?.message);
        throw new Error(error?.response?.data?.message);
      } else {
        console.error("Error deleting translation:", error.message);
        throw new Error(error.message);
      }
    }
  }
}

const translationService = new TranslationService();
export default translationService;