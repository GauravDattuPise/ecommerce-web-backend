
const HttpError = require("../../httpError/http-error")
const categoryService = require("../services/category-service")

// create category
exports.createCategory = async (req, res, next) => {
    try {
        const categoryData = req.body
        let { name, description } = categoryData

        // validations

        if (!name || name.trim() === "") {
            return next(new HttpError("category name is required", 400))
        }
        if (!description || name.trim() === "") {
            return next(new HttpError("category description is required", 400))
        }

        // check category exists or not
        const findCategory = await categoryService.checkCategory(name)
        if (findCategory) {
            return next(new HttpError("given category already available", 409))
        }

        const category = await categoryService.createCategory(categoryData)
        return res.status(201).send({ success: true, message: "category created", category })

    } catch (error) {
        console.log(error.message)
        next(new HttpError("server error in create category", 500))
    }
}


// get all categories
exports.getAllCategories = async (req, res, next) => {
    try {

        const categories = await categoryService.getAllCategories()
        return res.status(200).send({ success: true, message: "category created", categories })

    } catch (error) {
        console.log(error.message)
        next(new HttpError("server error in get all categories", 500))
    }
}