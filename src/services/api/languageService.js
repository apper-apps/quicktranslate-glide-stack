class LanguageService {
  constructor() {
    this.tableName = 'language_c';
    this.apperClient = null;
    this.initializeClient();
  }

  initializeClient() {
    const { ApperClient } = window.ApperSDK;
    this.apperClient = new ApperClient({
      apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
      apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
    });
  }

  async getAll() {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "code_c" } },
          { field: { Name: "native_name_c" } },
          { field: { Name: "flag_c" } }
        ],
        orderBy: [
          { fieldName: "Name", sorttype: "ASC" }
        ]
      };

      const response = await this.apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      // Map database fields to UI expected format
      const languages = (response.data || []).map(lang => ({
        Id: lang.Id,
        code: lang.code_c,
        name: lang.Name,
        nativeName: lang.native_name_c,
        flag: lang.flag_c
      }));

      return languages;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching languages:", error?.response?.data?.message);
        throw new Error(error?.response?.data?.message);
      } else {
        console.error("Error fetching languages:", error.message);
        throw new Error(error.message);
      }
    }
  }

  async getById(id) {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "code_c" } },
          { field: { Name: "native_name_c" } },
          { field: { Name: "flag_c" } }
        ]
      };

      const response = await this.apperClient.getRecordById(this.tableName, id, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (!response.data) {
        throw new Error("Language not found");
      }

      // Map database fields to UI expected format
      return {
        Id: response.data.Id,
        code: response.data.code_c,
        name: response.data.Name,
        nativeName: response.data.native_name_c,
        flag: response.data.flag_c
      };
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching language by ID:", error?.response?.data?.message);
        throw new Error(error?.response?.data?.message);
      } else {
        console.error("Error fetching language by ID:", error.message);
        throw new Error(error.message);
      }
    }
  }

  async getByCode(code) {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "code_c" } },
          { field: { Name: "native_name_c" } },
          { field: { Name: "flag_c" } }
        ],
        where: [
          {
            FieldName: "code_c",
            Operator: "EqualTo",
            Values: [code]
          }
        ]
      };

      const response = await this.apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (!response.data || response.data.length === 0) {
        throw new Error("Language not found");
      }

      // Map database fields to UI expected format
      const lang = response.data[0];
      return {
        Id: lang.Id,
        code: lang.code_c,
        name: lang.Name,
        nativeName: lang.native_name_c,
        flag: lang.flag_c
      };
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching language by code:", error?.response?.data?.message);
        throw new Error(error?.response?.data?.message);
      } else {
        console.error("Error fetching language by code:", error.message);
        throw new Error(error.message);
      }
    }
  }

  async create(languageData) {
    try {
      // Map UI fields to database fields, only Updateable fields
      const params = {
        records: [{
          Name: languageData.name,
          code_c: languageData.code,
          native_name_c: languageData.nativeName,
          flag_c: languageData.flag
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
          console.error(`Failed to create language ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
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
            code: result.code_c,
            name: result.Name,
            nativeName: result.native_name_c,
            flag: result.flag_c
          };
        }
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating language:", error?.response?.data?.message);
        throw new Error(error?.response?.data?.message);
      } else {
        console.error("Error creating language:", error.message);
        throw new Error(error.message);
      }
    }
  }

  async update(id, languageData) {
    try {
      // Map UI fields to database fields, only Updateable fields
      const params = {
        records: [{
          Id: parseInt(id),
          Name: languageData.name,
          code_c: languageData.code,
          native_name_c: languageData.nativeName,
          flag_c: languageData.flag
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
          console.error(`Failed to update language ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
          
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
            code: result.code_c,
            name: result.Name,
            nativeName: result.native_name_c,
            flag: result.flag_c
          };
        }
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating language:", error?.response?.data?.message);
        throw new Error(error?.response?.data?.message);
      } else {
        console.error("Error updating language:", error.message);
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
          console.error(`Failed to delete language ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
          
          failedDeletions.forEach(record => {
            if (record.message) throw new Error(record.message);
          });
        }
        
        return successfulDeletions.length > 0;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting language:", error?.response?.data?.message);
        throw new Error(error?.response?.data?.message);
      } else {
        console.error("Error deleting language:", error.message);
        throw new Error(error.message);
      }
    }
  }
}

const languageService = new LanguageService();
export default languageService;