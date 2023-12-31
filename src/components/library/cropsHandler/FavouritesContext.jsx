import React, { createContext, useContext, useEffect, useState } from "react";
import localStorageData from "../../utils/LocalStorage";
import debounce from "../../utils/Debounce";

const LOCAL_STORAGE_KEY = "favoriteCrops";
const debouncedLocalStorageData = debounce(localStorageData, 500);

const FavoritesContext = createContext();

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};

export const FavoritesProvider = ({ children }) => {
  const storedFavorites = localStorageData(LOCAL_STORAGE_KEY) || [];
  const [favoriteCrops, setFavoriteCrops] = useState(storedFavorites);

  const addToFavorites = (crop) => {
    if (!favoriteCrops.some((favoriteCrop) => favoriteCrop.id === crop.id)) {
      setFavoriteCrops((prevFavorites) => {
        const newFavorites = [...prevFavorites, crop];
        debouncedLocalStorageData(LOCAL_STORAGE_KEY, newFavorites);
        // console.log("crop added, showing newFavorites", newFavorites);
        return newFavorites;
      });
    }
  };

  const removeFromFavorites = (cropId) => {
    setFavoriteCrops((prevFavorites) => {
      const newFavorites = prevFavorites.filter((crop) => crop.id !== cropId);
      debouncedLocalStorageData(LOCAL_STORAGE_KEY, newFavorites);
      // console.log("crop removed, showing newFavorites", newFavorites);
      return newFavorites;
    });
  };

  const isCropFavorited = (cropId) => {
    return favoriteCrops.some((crop) => crop.id === cropId);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favoriteCrops,
        addToFavorites,
        removeFromFavorites,
        isCropFavorited,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
