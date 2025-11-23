// backend/index.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    dbName: "product_landing",
  })
  .then(() => {
    console.log("✅ Connected to MongoDB");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
  });

// Product schema & model
const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  rating: Number,
  imageUrl: String,
});

const Product = mongoose.model("Product", productSchema);

// Seed route (run once to insert products)
app.get("/seed", async (req, res) => {
  try {
    const count = await Product.countDocuments();
    if (count > 0) {
      return res.json({ message: "Products already seeded" });
    }

    const sampleProducts = [
      {
        name: "Smartphone Max 20",
        category: "Electronics",
        price: 59999,
        rating: 4.5,
        imageUrl: "https://m.media-amazon.com/images/I/61zhHIVvhzL.jpg",
      },
      {
        name: "Noise Cancelling Headphones",
        category: "Electronics",
        price: 7999,
        rating: 4.3,
        imageUrl: "https://via.placeholder.com/300x200?text=Headphones",
      },
      {
        name: "Gaming Laptop Pro",
        category: "Electronics",
        price: 89999,
        rating: 4.7,
        imageUrl: "https://via.placeholder.com/300x200?text=Laptop",
      },
      {
        name: "Wireless Mouse",
        category: "Accessories",
        price: 999,
        rating: 4.1,
        imageUrl: "https://via.placeholder.com/300x200?text=Mouse",
      },
      {
        name: "Mechanical Keyboard",
        category: "Accessories",
        price: 3499,
        rating: 4.4,
        imageUrl: "https://via.placeholder.com/300x200?text=Keyboard",
      },
      {
        name: "Fitness Smartwatch",
        category: "Wearables",
        price: 5999,
        rating: 4.2,
        imageUrl: "https://via.placeholder.com/300x200?text=Smartwatch",
      },
      {
        name: "Bluetooth Speaker",
        category: "Electronics",
        price: 2499,
        rating: 4.0,
        imageUrl: "https://via.placeholder.com/300x200?text=Speaker",
      },
      {
        name: "DSLR Camera Lite",
        category: "Electronics",
        price: 45999,
        rating: 4.6,
        imageUrl: "https://via.placeholder.com/300x200?text=Camera",
      },
      {
        name: "Office Chair Ergonomic",
        category: "Furniture",
        price: 7999,
        rating: 4.3,
        imageUrl: "https://via.placeholder.com/300x200?text=Chair",
      },
      {
        name: "Minimal Study Desk",
        category: "Furniture",
        price: 5499,
        rating: 4.2,
        imageUrl: "https://via.placeholder.com/300x200?text=Desk",
      },
      {
        name: "Wireless Earbuds",
        category: "Wearables",
        price: 1999,
        rating: 4.1,
        imageUrl: "https://via.placeholder.com/300x200?text=Earbuds",
      },
      {
        name: "4K Monitor 27 inch",
        category: "Electronics",
        price: 28999,
        rating: 4.5,
        imageUrl: "https://via.placeholder.com/300x200?text=Monitor",
      },
    ];

    await Product.insertMany(sampleProducts);
    res.json({ message: "Seeded products successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to seed products" });
  }
});

// GET /products - list all products
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// GET /search?q=term - search by product name (max 5)
app.get("/search", async (req, res) => {
  try {
    const term = req.query.q || "";
    if (!term.trim()) {
      return res.json([]);
    }

    const regex = new RegExp(term, "i"); // case-insensitive, partial
    const results = await Product.find({ name: regex }).limit(5);
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to search products" });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
