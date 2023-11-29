import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.OPEN_EXCHANGE_API_KEY;

const app = express();

//Enable CORS on all routes
app.use(cors());

app.get("/api/exchangerate", async (req, res) => {
  try {
    //Make a request to the Exchange Rate API
    const response = await axios
      .get
      // `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/TTD`
      ();
    //Send the response data back to the client
    res.json(response.data);
  } catch (error) {
    console.error("Error making request to external API", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
