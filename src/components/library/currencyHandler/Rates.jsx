import axios from "axios";
import localStorageData from "../../utils/LocalStorage";

const getCurrentDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const getRates = async () => {
  try {
    const cachedData = localStorageData("exchangeRates");
    // console.log("cachedData", cachedData);

    // Check if the cached rates are still valid
    if (cachedData && cachedData.date === getCurrentDate()) {
      // console.log("Using cached rates");
    } else {
      const rates = await axios.get("/api/exchangerate");

      // Check if the response contains the expected data structure
      if (!rates) {
        throw new Error("Invalid response from API");
      }

      // Cache the rates
      localStorageData("exchangeRates", {
        date: getCurrentDate(),
        rates: rates.data,
      });

      // console.log("Using new rates");
    }

    const cachedRates = localStorageData("exchangeRates").rates;
    return cachedRates;
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
    throw new Error("Failed to fetch exchange rates");
  }
};

export default getRates;
