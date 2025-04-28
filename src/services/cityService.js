// src/services/cityService.js

export const searchCities = async (query) => {
    if (!query) return [];
  
    try {
      const response = await fetch(`/api/search-cities?query=${encodeURIComponent(query)}`);
      const data = await response.json();
  
      if (!data.cities) return [];
  
      return data.cities;
    } catch (error) {
      console.error("Error fetching cities from backend:", error);
      return [];
    }
  };