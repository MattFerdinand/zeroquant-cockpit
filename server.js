const express = require("express");
const path = require("path");
const app = express();

const PORT = process.env.PORT || 3000;

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, "public")));

// API status check
app.get("/api/status", (req, res) => {
  res.json({ status: "Cockpit online" });
});

// Catch-all route to serve dashboard
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "dashboard.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`ZeroQuant Cockpit running on port ${PORT}`);
});
