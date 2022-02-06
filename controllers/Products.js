const res = require("express/lib/response");
const db = require("../models");
const ProductImage = require("../models/productimage");

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

const create = async (body) => {
  try {
    const newProduct = await db.Product.create(body);
    return newProduct;
  } catch (error) {
    return error;
  }
};

const remove = async (id) => {
  try {
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

module.exports = {
  getAll,
  create,
  remove,
  update,
};
