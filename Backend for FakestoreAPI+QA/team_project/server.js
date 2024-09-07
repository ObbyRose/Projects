const axios = require("axios");
const express = require("express");

const app = express();
const port = 3000;

const baseURL = "https://fakestoreapi.com";

app.use(express.json()); // Middleware to parse JSON request bodies

// GET ALL PRODUCTS
app.get("/products", async (req, res) => {
  try {
    const response = await axios.get(`${baseURL}/products`);
    res.json(response.data);
  } catch (err) {
    console.error("Get All products Error", err);
    res.status(500).send("Server Error");
  }
});

// GET PRODUCTS BY ID
app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await axios.get(`${baseURL}/products/${id}`);
    if (!response.data) {
      return res.status(404).send(`id does not exist`);
    }
    res.json(response.data);
  } catch (err) {
    console.error("Get All products Error", err);
    res.status(500).send("Server Error");
  }
});

app.post("/api/products", async (req, res) => {
  try {

    // Extract data from the incoming request body
    const productData = {
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      category: req.body.category,
      image: req.body.image,
    }; // Make a POST request to an external API using Axios
    if (req.body === undefined){
      throw res.status(400).send({message: `Product not found`})
    }
    const externalApiUrl = `${baseURL}/products`; // Corrected the URL
    const response = await axios.post(externalApiUrl, productData); // Send success response to the client

    res.status(200).json({
      message: "Product submitted successfully",
      externalApiResponse: response.data,
    });
  } catch (error) {
    // Handle errors and send an error response
    res.status(500).json({
      message: "Failed to submit product",
      error: error.message,
    });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;
