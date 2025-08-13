class FavoriteService {
  constructor() {
    this.tableName = 'favorite_c';
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
          { field: { Name: "translation_id_c" } },
          { field: { Name: "category_c" } },
          { field: { Name: "added_at_c" } }
        ],
        orderBy: [
          { fieldName: "added_at_c", sorttype: "DESC" }
        ]
      };

      const response = await this.apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      // Map database fields to UI expected format
      const favorites = (response.data || []).map(fav => ({
        Id: fav.Id,
        translationId: fav.translation_id_c,
        category: fav.category_c,
        addedAt: fav.added_at_c
      }));

      return favorites;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching favorites:", error?.response?.data?.message);
        throw new Error(error?.response?.data?.message);
      } else {
        console.error("Error fetching favorites:", error.message);
        throw new Error(error.message);
      }
    }
  }

  async getById(id) {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "translation_id_c" } },
          { field: { Name: "category_c" } },
          { field: { Name: "added_at_c" } }
        ]
      };

      const response = await this.apperClient.getRecordById(this.tableName, id, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (!response.data) {
        throw new Error("Favorite not found");
      }

      // Map database fields to UI expected format
      return {
        Id: response.data.Id,
        translationId: response.data.translation_id_c,
        category: response.data.category_c,
        addedAt: response.data.added_at_c
      };
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching favorite by ID:", error?.response?.data?.message);
        throw new Error(error?.response?.data?.message);
      } else {
        console.error("Error fetching favorite by ID:", error.message);
        throw new Error(error.message);
      }
    }
  }

  async getByTranslationId(translationId) {
    try {
      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "translation_id_c" } },
          { field: { Name: "category_c" } },
          { field: { Name: "added_at_c" } }
        ],
        where: [
          {
            FieldName: "translation_id_c",
            Operator: "EqualTo",
            Values: [translationId.toString()]
          }
        ]
      };

      const response = await this.apperClient.fetchRecords(this.tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (!response.data || response.data.length === 0) {
        return null;
      }

      // Map database fields to UI expected format
      const fav = response.data[0];
      return {
        Id: fav.Id,
        translationId: fav.translation_id_c,
        category: fav.category_c,
        addedAt: fav.added_at_c
      };
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching favorite by translation ID:", error?.response?.data?.message);
        throw new Error(error?.response?.data?.message);
      } else {
        console.error("Error fetching favorite by translation ID:", error.message);
        throw new Error(error.message);
      }
    }
  }

  async create(favoriteData) {
    try {
      // Map UI fields to database fields, only Updateable fields
      const params = {
        records: [{
          Name: favoriteData.category || "Favorite",
          translation_id_c: favoriteData.translationId.toString(),
          category_c: favoriteData.category,
          added_at_c: new Date().toISOString()
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
          console.error(`Failed to create favorite ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
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
            translationId: result.translation_id_c,
            category: result.category_c,
            addedAt: result.added_at_c
          };
        }
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating favorite:", error?.response?.data?.message);
        throw new Error(error?.response?.data?.message);
      } else {
        console.error("Error creating favorite:", error.message);
        throw new Error(error.message);
      }
    }
  }

  async update(id, favoriteData) {
    try {
      // Map UI fields to database fields, only Updateable fields
      const params = {
        records: [{
          Id: parseInt(id),
          Name: favoriteData.category || "Favorite",
          translation_id_c: favoriteData.translationId.toString(),
          category_c: favoriteData.category,
          added_at_c: favoriteData.addedAt || new Date().toISOString()
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
          console.error(`Failed to update favorite ${failedUpdates.length} records:${JSON.stringify(failedUpdates)}`);
          
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
            translationId: result.translation_id_c,
            category: result.category_c,
            addedAt: result.added_at_c
          };
        }
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating favorite:", error?.response?.data?.message);
        throw new Error(error?.response?.data?.message);
      } else {
        console.error("Error updating favorite:", error.message);
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
          console.error(`Failed to delete favorite ${failedDeletions.length} records:${JSON.stringify(failedDeletions)}`);
          
          failedDeletions.forEach(record => {
            if (record.message) throw new Error(record.message);
          });
        }
        
        return successfulDeletions.length > 0;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting favorite:", error?.response?.data?.message);
        throw new Error(error?.response?.data?.message);
      } else {
        console.error("Error deleting favorite:", error.message);
        throw new Error(error.message);
      }
    }
  }

  async deleteByTranslationId(translationId) {
    try {
      // First find the favorite by translation ID
      const favorite = await this.getByTranslationId(translationId);
      if (!favorite) {
        throw new Error("Favorite not found");
      }

      // Then delete it
      return await this.delete(favorite.Id);
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting favorite by translation ID:", error?.response?.data?.message);
        throw new Error(error?.response?.data?.message);
      } else {
        console.error("Error deleting favorite by translation ID:", error.message);
        throw new Error(error.message);
      }
    }
  }
}

const favoriteService = new FavoriteService();
export default favoriteService;