const res = require("express/lib/response");
const db = require("../models");

const getAll = async () => {
  try {
    const products = await db.Product.findAll();
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

    const response =
      deletedProduct === 0
        ? res.status(404).send({ message: "resource not found" })
        : res.status(201).send({ message: "success" });

    return response;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAll,
  create,
  remove,
};
