import favoritesData from "@/services/mockData/favorites.json";

class FavoriteService {
  constructor() {
    this.favorites = [...favoritesData];
  }

  async delay() {
    await new Promise(resolve => setTimeout(resolve, 250));
  }

  async getAll() {
    await this.delay();
    return [...this.favorites];
  }

  async getById(id) {
    await this.delay();
    const favorite = this.favorites.find(fav => fav.Id === parseInt(id));
    if (!favorite) {
      throw new Error("Favorite not found");
    }
    return { ...favorite };
  }

  async getByTranslationId(translationId) {
    await this.delay();
    const favorite = this.favorites.find(fav => fav.translationId === translationId);
    return favorite ? { ...favorite } : null;
  }

  async create(favoriteData) {
    await this.delay();
    const maxId = this.favorites.length > 0 
      ? Math.max(...this.favorites.map(fav => fav.Id)) 
      : 0;
    const newFavorite = {
      Id: maxId + 1,
      addedAt: new Date().toISOString(),
      ...favoriteData
    };
    this.favorites.push(newFavorite);
    return { ...newFavorite };
  }

  async update(id, favoriteData) {
    await this.delay();
    const index = this.favorites.findIndex(fav => fav.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Favorite not found");
    }
    this.favorites[index] = { ...this.favorites[index], ...favoriteData };
    return { ...this.favorites[index] };
  }

  async delete(id) {
    await this.delay();
    const index = this.favorites.findIndex(fav => fav.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Favorite not found");
    }
    const deletedFavorite = { ...this.favorites[index] };
    this.favorites.splice(index, 1);
    return deletedFavorite;
  }

  async deleteByTranslationId(translationId) {
    await this.delay();
    const index = this.favorites.findIndex(fav => fav.translationId === translationId);
    if (index === -1) {
      throw new Error("Favorite not found");
    }
    const deletedFavorite = { ...this.favorites[index] };
    this.favorites.splice(index, 1);
    return deletedFavorite;
  }
}

const favoriteService = new FavoriteService();
export default favoriteService;