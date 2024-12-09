const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const campaignRoutes = require("./routes/campaign");
const path = require("path");



dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(require("cors")());

// Routes
app.use("/api", authRoutes);
app.use("/api/campaigns", campaignRoutes); // Add the campaign routes
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
