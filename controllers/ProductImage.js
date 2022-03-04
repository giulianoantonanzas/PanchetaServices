const db = require("../models");
const fs = require("fs");
const { promisify } = require("util");
const unlinkAsync = promisify(fs.unlink);

/**
 * @param {number} product_id
 * @param {{path:string, mimetype:string, fieldname:string}[]} imgArray
 * @return {{path:string, mimetype:string, fieldname:string}[]}
 */
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

/**
 * @param {number} product_id 
 * @returns {{path:string, mimetype:string, fieldname:string}}
 */
const deleteImagesByProductId = async (product_id) => {
  const producTImages = await db.ProductImage.findAll({
    where: {
      product_id,
    },
  });

  producTImages.forEach(async (img) => {
    unlinkAsync(process.env.PWD + "/public/" + img.path);
  });
  return producTImages
};

/**
 * @param {number} id 
 * @param {string | undefined} path
 * @returns {{path:string, mimetype:string, fieldname:string}}
 */
const removeImageById = async (id) => {
  const productimage = db.ProductImage.findByPk(id)
  await db.ProductImage.destroy({
    where: {
      id,
    }
  })

  if (productimage?.path) {
    try {
      unlinkAsync(process.env.PWD + "/public/" + productimage.path);
    } catch (e) {
      console.log(e);
    }
  }

  return productimage
}

module.exports = {
  create,
  deleteImagesByProductId,
  removeImageById,
};
