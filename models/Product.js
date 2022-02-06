"use strict";
const { Model } = require("sequelize");
const ProductImage = require("./productimage");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.hasMany(models.ProductImage, {
        foreignKey: "product_id",
        onDelete: "cascade",
      });
    }
  }
  Product.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      price: DataTypes.NUMBER,
      stock: DataTypes.NUMBER,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
