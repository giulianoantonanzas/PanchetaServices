const res = require("express/lib/response");
const db = require("../models");
const ProductImage = require("../controllers/productimage");

const getAll = async () => {
  try {
    const products = await db.Product.findAll({
      include: [
        {
          model: db.ProductImage,
          required: false,
        },
      ],
    });

    return products;
  } catch (error) {}
};

const create = async (body, files) => {
  try {
    if (!files) {
      const error = new Error("Please upload a file");
      error.httpStatusCode = 400;
      return next(error);
    }

    const newProduct = await db.Product.create(body);

    const createdImages = await ProductImage.create(newProduct.id, files);

    return {
      newProduct,
      createdImages,
    };
  } catch (error) {
    return error;
  }
};

const remove = async (id) => {
  try {
    await ProductImage.deleteImagesByProductId(id);

    const deletedProduct = await db.Product.destroy({
      where: {
        id,
      },
    });

    const response = deletedProduct
      ? { message: "success", code: 201 }
      : { message: "resource not found", code: 404 };

    return response;
  } catch (error) {
    return error;
  }
};

const update = async (body) => {
  try {
    const updatedProduct = await db.Product.update(body, {
      where: { id: body.id },
    });

    return updatedProduct;
  } catch (error) {
    return error;
  }
};

const findById = async (id) => {
  try {
    const product = await db.Product.findByPk(id, {
      include: [
        {
          model: db.ProductImage,
          required: false,
        },
      ],
    });

    return product;
  } catch (error) {}
};

module.exports = {
  getAll,
  create,
  remove,
  update,
  findById,
};
