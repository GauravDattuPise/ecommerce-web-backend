const categoryModel = require("../models/category-model")

// create category
exports.createCategory = async (category) => {
    return await categoryModel.create(category)
}

// get all categories
exports.getAllCategories = async () => {
    return await categoryModel.find();
}

// check category exists or not by name
exports.checkCategory = async (categoryName) => {
    return await categoryModel.findOne({name : categoryName})
}

// check category exists or not by categoryId
exports.checkCategoryById = async (categoryId) => {
    return await categoryModel.findOne({_id : categoryId})
}
