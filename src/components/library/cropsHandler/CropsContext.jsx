import { createContext, useState, useEffect } from "react";
import axios from "axios";
import localStorageData from "../../utils/LocalStorage";

const CropsContext = createContext();

// eslint-disable-next-line react/prop-types
const CropsProvider = ({ children }) => {
  const [cropsData, setCropsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const cachedCropData = localStorageData("cropsData");
      try {
        const currentDate = new Date().toISOString().slice(0, 10);

        const cachedDate = cachedCropData
          ? new Date(cachedCropData[0].dates[0]).toISOString().slice(0, 10)
          : null;

        if (cachedCropData && currentDate === cachedDate) {
          setCropsData(cachedCropData);
          setLoading(false);
        } else {
          const response = await axios.get(
            "https://cropdate-server.azurewebsites.net/api/crops",
            {
              headers: {
                "Content-Type": "application/json",
              },
            },
          );
          setCropsData(response.data);
          localStorageData("cropsData", response.data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        if (!navigator.onLine && cachedCropData) {
          setCropsData(cachedCropData);
          setLoading(false);
        } else {
          console.log("No local storage data");
        }
      }
    };

    fetchData();
  }, []);

  return (
    <CropsContext.Provider value={{ cropsData, loading }}>
      {children}
    </CropsContext.Provider>
  );
};

export { CropsProvider, CropsContext };
