const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = 3005;

// Generate sample data
const activities = ["Login", "Client Meeting"];
const products = ["SIP", "Unlisted Share", "Wealth Box"];
const statuses = ["Approved", "Pending", "Rejected"];
const requests = ["Edit", "Delete", "Create"];
const clients = Array.from({ length: 1000 }, (_, i) => ({
  activity: activities[Math.floor(Math.random() * activities.length)],
  client_name: `Client${i + 1}`,
  product: products[Math.floor(Math.random() * products.length)],
  pan_number: `ABCDE${Math.floor(1000 + Math.random() * 9000)}F`,
  phone_number: `9${Math.floor(100000000 + Math.random() * 900000000)}`,
  request_for: requests[Math.floor(Math.random() * requests.length)],
  status: statuses[Math.floor(Math.random() * statuses.length)],
}));

// Utility to filter, sort, and paginate data
const filterAndSortData = (data, columnConfigs, pageNumber, pageSize) => {
  let filteredData = data;

  // Apply filtering
  columnConfigs.forEach((config) => {
    
    if (config.search_str) {
      const searchRegex = new RegExp(config.search_str, "i");
      filteredData = filteredData.filter((item) =>
        searchRegex.test(item[config.column])
      );
    }
  });

  // Apply sorting
  columnConfigs.forEach((config) => {
    if (config.sort) {
      filteredData.sort((a, b) => {
        const valA = a[config.column].toString().toLowerCase();
        const valB = b[config.column].toString().toLowerCase();
        if (config.sort === "asc") return valA > valB ? 1 : -1;
        if (config.sort === "desc") return valA < valB ? 1 : -1;
        return 0;
      });
    }
  });

  // Calculate pagination
  const totalElements = filteredData.length;
  const totalPages = Math.ceil(totalElements / pageSize);
  const startIndex = (pageNumber - 1) * pageSize;
  const paginatedData = filteredData.slice(startIndex, startIndex + pageSize);

  return {
    data: paginatedData,
    current_page_number: pageNumber,
    page_size: pageSize,
    total_number_of_elements: totalElements,
    total_pages: totalPages,
  };
};

// GET endpoint with pagination, filtering, and sorting
app.get("/data", (req, res) => {
  const { page_number = 1, page_size = 10, column_configs = "[]" } = req.query;

  let columnConfigs = "[]";

  const pageNumber = parseInt(page_number, 10);
  const pageSize = parseInt(page_size, 10);
  try {
    columnConfigs = JSON.parse(column_configs);
  } catch (error) {
    res.status(400).json({
      message: "Invalid value sent for column_configs, send a valid object",
      data: {
        column_configs,
      },
    });
    return;
  }

  const result = filterAndSortData(
    clients,
    columnConfigs,
    pageNumber,
    pageSize
  );
  res.json(result);
});

// GET endpoint to fetch all data
app.get("/data/all", (req, res) => {
  res.json(clients);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});