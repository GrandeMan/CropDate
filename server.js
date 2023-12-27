import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();

//Enable CORS on all routes
app.use(cors());

app.get("/api/exchangerate", async (req, res) => {
  try {
    //Make a request to the Exchange Rate API
    const response = await axios.get(
      "https://cropdate-server.azurewebsites.net/api/currency",
    );

    //Send the response data back to the client
    res.json(response.data);
  } catch (error) {
    console.error("Error making request to external API", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/crops", async (req, res) => {
  try {
    const response = await axios.get(
      "https://cropdate-server.azurewebsites.net/api/crops",
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error making request to external API", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
