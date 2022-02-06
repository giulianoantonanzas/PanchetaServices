"use strict";
const { Model } = require("sequelize");
const Product = require("./Product");
module.exports = (sequelize, DataTypes) => {
  class ProductImage extends Model {
    static associate(models) {
      ProductImage.belongsTo(models.Product, {
        as: "product",
        foreignKey: "product_id",
      });
    }
  }
  ProductImage.init(
    {
      path: DataTypes.STRING,
      product_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ProductImage",
    }
  );
  return ProductImage;
};
