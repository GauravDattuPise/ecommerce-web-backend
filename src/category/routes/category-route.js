
const express = require("express");
const router = express.Router();

const { createCategory, getAllCategories } = require("../controllers/category-controller");

// create category
router.post("/create", createCategory)

// get all categories
router.get("/get-all-categoires", getAllCategories)

module.exports = router