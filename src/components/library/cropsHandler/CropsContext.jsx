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
      try {
        const cachedCropData = localStorageData("cropsData");
        const currentDate = new Date().toLocaleDateString();
        const cachedDate = cachedCropData
          ? new Date(cachedCropData.date).toLocaleDateString()
          : null;

        if (cachedCropData && currentDate === cachedDate) {
          setCropsData(cachedCropData.data);
          setLoading(false);
        } else {
          const response = await axios.get("/api/crops");
          setCropsData(response.data);
          // console.log("cropsData", response.data.crops);
          localStorageData("cropsData", response.data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
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
