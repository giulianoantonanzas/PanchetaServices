const db = require("../models");
const fs = require("fs");
const { promisify } = require("util");
const unlinkAsync = promisify(fs.unlink);

const create = async (product_id, imgArray) => {
  const listImg = [];
  imgArray.forEach(async (img) => {
    const newProductImage = await db.ProductImage.create({
      product_id,
      path: img.filename,
    });
    listImg.push(newProductImage);
  });
  return listImg;
};

const deleteImagesByProductId = async (product_id) => {
  const producTImages = await db.ProductImage.findAll({
    where: {
      product_id,
    },
  });

  producTImages.forEach(async (img) => {
    unlinkAsync(process.env.PWD + "/uploads/" + img.path);
  });

  return await db.ProductImage.destroy({
    where: {
      product_id,
    },
  });
};

module.exports = {
  create,
  deleteImagesByProductId,
};
