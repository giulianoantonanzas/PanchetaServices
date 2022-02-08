const db = require("../models");
const ProductImage = require("../controllers/productimage");

/**
 @description get all products
 @param {number} currentPage current page on you stay
 */
const getAll = async (currentPage) => {
  let limit = 10
  let offset = 0 + (currentPage - 1) * limit
  try {
    return await db.Product.findAll({
      include: [
        {
          model: db.ProductImage,
          required: false,
        },
      ],
      limit,
      offset
    });
  } catch (error) { }
};

/**
 * @param {{name:string, description?:string, price?:number, stock?:number}} body
 * @param {{path:string, mimetype:string, fieldname:string}[]} files
 */
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

/**
 * @description remove product from id and images from productImages 
*/
const remove = async (id) => {
  try {
    await ProductImage.deleteImagesByProductId(id);

    const deletedProduct = await db.Product.destroy({
      where: {
        id,
      },
    });

    return deletedProduct
      ? { message: "success", code: 201 }
      : { message: "resource not found", code: 404 };

  } catch (error) {
    return error;
  }
};


/**
 * @param {{name:string, description?:string, price?:number, stock?:number}} body
 */
const update = async (body) => {
  try {
    return await db.Product.update(body, {
      where: { id: body.id },
    });

  } catch (error) {
    return error;
  }
};


/**
 * @description get a product by id 
*/
const findById = async (id) => {
  try {
    return await db.Product.findByPk(id, {
      include: [
        {
          model: db.ProductImage,
          required: false,
        },
      ],
    });
  } catch (error) { return error }
};

module.exports = {
  getAll,
  create,
  remove,
  update,
  findById,
};
