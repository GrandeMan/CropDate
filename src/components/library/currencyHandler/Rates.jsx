import axios from "axios";
import localStorageData from "../../utils/LocalStorage";

const getCurrentDate = () => {
  const date = new Date().toISOString().slice(0, 10);
  return date;
};

const getRates = async () => {
  const cachedData = localStorageData("exchangeRates");
  try {
    // Check if the cached rates are still valid
    if (cachedData && cachedData.date === getCurrentDate()) {
      // console.log("Using cached rates");
      return cachedData.rates;
    } else {
      const rates = await axios.get(
        "https://cropdate-server.azurewebsites.net/api/currency",
      );

      // Check if the response contains the expected data structure
      if (!rates) {
        throw new Error("Invalid response from API");
      }

      // Cache the rates
      localStorageData("exchangeRates", {
        date: getCurrentDate(),
        rates: rates.data,
      });
    }

    const cachedRates = localStorageData("exchangeRates").rates;
    return cachedRates;
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
    if (!navigator.onLine && cachedData) {
      return cachedData.rates;
    } else {
      throw new Error("No local storage data");
    }
  }
};

export default getRates;
