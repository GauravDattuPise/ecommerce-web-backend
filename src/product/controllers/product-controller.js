const HttpError = require("../../httpError/http-error")
const categoryService = require("../../category/services/category-service")
const productService = require("../services/product-service")
const { default: mongoose } = require("mongoose")

// create product
exports.createProduct = async (req, res, next) => {
    try {
        const productData = req.body
        let { title, description, price, categoryId } = productData

        // validations
        if (!title || title.trim() === "") {
            return next(new HttpError("product title is required", 400))
        }
        if (!description || description.trim() === "") {
            return next(new HttpError("product description is required", 400))
        }
        if (!price) {
            return next(new HttpError("product price is required", 400))
        }
        if (typeof price !== "number") {
            return next(new HttpError("product price value should be number", 400))
        }
        if (!categoryId || categoryId.trim() === "") {
            return next(new HttpError("product categoryId is required", 400))
        }

        if (!mongoose.isValidObjectId(categoryId)) {
            return next(new HttpError("categoryId is not valid objectId", 400))
        }

        // check category exists or not by categoryId
        const findCategory = await categoryService.checkCategoryById(categoryId)
        if (!findCategory) {
            return next(new HttpError("given category not found", 404))
        }

        // saved product
        const product = await productService.createProduct(productData)
        return res.status(201).send({ success: true, message: "product created", product })

    } catch (error) {
        console.log(error.message)
        next(new HttpError("server error in create product", 500))
    }
}


// get products of specific category
exports.getProductsOfCategory = async (req, res, next) => {
    try {
        const { categoryId } = req.params

        if (!mongoose.isValidObjectId(categoryId)) {
            return next(new HttpError("categoryId is not valid objectId", 400))
        }

        // check category exists or not by categoryId
        const findCategory = await categoryService.checkCategoryById(categoryId)
        if (!findCategory) {
            return next(new HttpError("given category not found", 404))
        }

        const products = await productService.getProductsOfCategory(categoryId)
        if (products.length === 0) {
            return next(new HttpError("products are not availble in this category", 404))
        }
        return res.status(200).send({ success: true, totalProducts: products.length, products })

    } catch (error) {
        console.log(error.message)
        next(new HttpError("server error in get products of categories", 500))
    }
}


// get product by id
exports.getProductById = async (req, res, next) => {
    try {
        const { productId } = req.params

        if (!mongoose.isValidObjectId(productId)) {
            return next(new HttpError("productId is not valid objectId", 400))
        }

        const product = await productService.getProductById(productId)
        if (!product) {
            return next(new HttpError("Product not found", 404))
        }
        return res.status(200).send({ success: true, product })

    } catch (error) {
        console.log(error.message)
        next(new HttpError("server error in get product by id", 500))
    }
}