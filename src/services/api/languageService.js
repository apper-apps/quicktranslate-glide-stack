import languagesData from "@/services/mockData/languages.json";

class LanguageService {
  constructor() {
    this.languages = [...languagesData];
  }

  async delay() {
    await new Promise(resolve => setTimeout(resolve, 300));
  }

  async getAll() {
    await this.delay();
    return [...this.languages];
  }

  async getById(id) {
    await this.delay();
    const language = this.languages.find(lang => lang.Id === parseInt(id));
    if (!language) {
      throw new Error("Language not found");
    }
    return { ...language };
  }

  async getByCode(code) {
    await this.delay();
    const language = this.languages.find(lang => lang.code === code);
    if (!language) {
      throw new Error("Language not found");
    }
    return { ...language };
  }

  async create(languageData) {
    await this.delay();
    const maxId = Math.max(...this.languages.map(lang => lang.Id));
    const newLanguage = {
      Id: maxId + 1,
      ...languageData
    };
    this.languages.push(newLanguage);
    return { ...newLanguage };
  }

  async update(id, languageData) {
    await this.delay();
    const index = this.languages.findIndex(lang => lang.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Language not found");
    }
    this.languages[index] = { ...this.languages[index], ...languageData };
    return { ...this.languages[index] };
  }

  async delete(id) {
    await this.delay();
    const index = this.languages.findIndex(lang => lang.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Language not found");
    }
    const deletedLanguage = { ...this.languages[index] };
    this.languages.splice(index, 1);
    return deletedLanguage;
  }
}

const languageService = new LanguageService();
export default languageService;