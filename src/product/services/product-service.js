const productModel = require("../models/product-model");

// create product
exports.createProduct = async (product) => {
    return await productModel.create(product)
}

// get all Products of specific category
exports.getProductsOfCategory = async (category) => {
    return await productModel.find({categoryId : category});
}

// get single product
exports.getProductById = async (productId) => {
    return await productModel.findOne({_id : productId})
}

